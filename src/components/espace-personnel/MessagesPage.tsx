"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getInboxMessages, getSentMessages, sendInternalMessage, getUsers, getConversation } from "@/lib/authApi";
import { useSocket } from "@/context/SocketContext";
import { useAuth } from "@/context/AuthContext";
import { notification, ConfigProvider, Spin, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
	CheckCircleIcon,
	XCircleIcon,
	InboxIcon,
	PaperAirplaneIcon,
	EnvelopeIcon,
	EnvelopeOpenIcon,
	ChatBubbleLeftRightIcon,
	MagnifyingGlassIcon,
	ArrowUturnLeftIcon,
	PlusIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

type NotificationType = "success" | "error";

interface MessageUser {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
}

interface Message {
	_id: string;
	senderUser: MessageUser;
	recipientUser: MessageUser;
	subject: string;
	content: string;
	isRead: boolean;
	parentMessage: string | null;
	conversationId: string | null;
	threadCount?: number;
	unreadInThread?: number;
	createdAt: string;
}

interface MessagesPageProps {
	canComposeNew?: boolean;
}

const inputClass =
	"block w-full rounded-lg px-4 py-2.5 text-gray-900 bg-white border border-gray-300 focus:border-univers focus:ring-2 focus:ring-univers/20 shadow-sm placeholder:text-gray-400 text-sm font-medium transition-all duration-200";

export default function MessagesPage({ canComposeNew = false }: MessagesPageProps) {
	const [api, contextHolder] = notification.useNotification();
	const { user } = useAuth();
	const { socket } = useSocket();

	const [activeTab, setActiveTab] = useState<"inbox" | "sent">("inbox");
	const [messages, setMessages] = useState<Message[]>([]);
	const [loading, setLoading] = useState(true);
	const [pagination, setPagination] = useState<any>(null);

	// Conversation modal
	const [conversationOpen, setConversationOpen] = useState(false);
	const [conversationMessages, setConversationMessages] = useState<Message[]>([]);
	const [conversationLoading, setConversationLoading] = useState(false);
	const [conversationSubject, setConversationSubject] = useState("");
	const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
	const conversationEndRef = useRef<HTMLDivElement>(null);

	// Reply in conversation
	const [replyContent, setReplyContent] = useState("");
	const [replying, setReplying] = useState(false);

	// Compose modal (admin only)
	const [composeOpen, setComposeOpen] = useState(false);
	const [composeRecipient, setComposeRecipient] = useState<MessageUser | null>(null);
	const [composeSubject, setComposeSubject] = useState("");
	const [composeContent, setComposeContent] = useState("");
	const [composeSending, setComposeSending] = useState(false);

	// User search for compose
	const [userSearch, setUserSearch] = useState("");
	const [userResults, setUserResults] = useState<any[]>([]);
	const [userSearchLoading, setUserSearchLoading] = useState(false);

	const openNotification = (type: NotificationType, title: string, message: string) => {
		api[type]({
			message: title,
			description: message,
			icon:
				type === "success" ? (
					<CheckCircleIcon aria-hidden="true" className="h-6 w-6 text-green-400" />
				) : (
					<XCircleIcon aria-hidden="true" className="h-6 w-6 text-red-400" />
				),
		});
	};

	const loadMessages = useCallback(
		async (page: number = 1) => {
			setLoading(true);
			try {
				const response = activeTab === "inbox" ? await getInboxMessages(page) : await getSentMessages(page);
				setMessages(response.data.messages);
				setPagination(response.data.pagination);
			} catch {
				openNotification("error", "Erreur", "Impossible de charger les messages.");
			} finally {
				setLoading(false);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[activeTab]
	);

	useEffect(() => {
		loadMessages(1);
	}, [loadMessages]);

	// Real-time: listen for new messages via socket
	useEffect(() => {
		if (!socket) return;

		const handleNewMessage = () => {
			loadMessages(pagination?.page || 1);
		};

		socket.on("new-message", handleNewMessage);
		return () => {
			socket.off("new-message", handleNewMessage);
		};
	}, [socket, loadMessages, pagination?.page]);

	// Open conversation thread
	const handleOpenConversation = async (msg: Message) => {
		const convId = msg.conversationId || msg._id;
		setActiveConversationId(convId);
		setConversationSubject(msg.subject);
		setConversationOpen(true);
		setConversationLoading(true);
		setReplyContent("");

		try {
			const response = await getConversation(convId);
			setConversationMessages(response.data.messages);
			// Update the message in the list as read
			if (activeTab === "inbox") {
				setMessages((prev) =>
					prev.map((m) => (m.conversationId === convId || m._id === convId ? { ...m, isRead: true, unreadInThread: 0 } : m))
				);
			}
		} catch {
			openNotification("error", "Erreur", "Impossible de charger la conversation.");
			setConversationOpen(false);
		} finally {
			setConversationLoading(false);
		}
	};

	// Scroll to bottom of conversation when messages load
	useEffect(() => {
		if (conversationMessages.length > 0 && conversationEndRef.current) {
			setTimeout(() => conversationEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
		}
	}, [conversationMessages]);

	// Reply inside conversation thread
	const submitReply = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!activeConversationId || !replyContent.trim() || conversationMessages.length === 0) return;
		setReplying(true);

		// Find the other participant to reply to
		const lastMsg = conversationMessages[conversationMessages.length - 1];
		const recipientId =
			lastMsg.senderUser._id === user?._id ? lastMsg.recipientUser._id : lastMsg.senderUser._id;

		try {
			await sendInternalMessage({
				recipientUser: recipientId,
				subject: conversationSubject.startsWith("Re: ") ? conversationSubject : `Re: ${conversationSubject}`,
				content: replyContent,
				parentMessage: lastMsg._id,
			});
			setReplyContent("");
			// Reload conversation
			const response = await getConversation(activeConversationId);
			setConversationMessages(response.data.messages);
			loadMessages(pagination?.page || 1);
		} catch (error: any) {
			openNotification("error", "Erreur", error.response?.data?.error || "Erreur lors de l'envoi.");
		} finally {
			setReplying(false);
		}
	};

	// User search for compose
	useEffect(() => {
		if (!canComposeNew || !composeOpen || userSearch.length < 2) {
			setUserResults([]);
			return;
		}
		const timer = setTimeout(async () => {
			setUserSearchLoading(true);
			try {
				const response = await getUsers(1, undefined, userSearch);
				setUserResults(response.data.users || []);
			} catch {
				setUserResults([]);
			} finally {
				setUserSearchLoading(false);
			}
		}, 300);
		return () => clearTimeout(timer);
	}, [userSearch, canComposeNew, composeOpen]);

	const submitCompose = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!composeRecipient || !composeSubject.trim() || !composeContent.trim()) {
			openNotification("error", "Erreur", "Veuillez remplir tous les champs.");
			return;
		}
		setComposeSending(true);
		try {
			await sendInternalMessage({
				recipientUser: composeRecipient._id,
				subject: composeSubject,
				content: composeContent,
			});
			openNotification("success", "Envoyé", "Message envoyé avec succès.");
			setComposeOpen(false);
			setComposeRecipient(null);
			setComposeSubject("");
			setComposeContent("");
			setUserSearch("");
			if (activeTab === "sent") loadMessages(1);
		} catch (error: any) {
			openNotification("error", "Erreur", error.response?.data?.error || "Erreur lors de l'envoi.");
		} finally {
			setComposeSending(false);
		}
	};

	const roleLabels: Record<string, string> = {
		administrateur: "Admin",
		apprenant: "Apprenant",
		professionnel: "Pro",
	};

	return (
		<div>
			<ConfigProvider
				theme={{
					token: {
						colorBgElevated: "#ffffff",
						colorTextHeading: "#1a1a1a",
						colorText: "#374151",
						fontFamily: "Halibut",
					},
					components: {
						Modal: {
							titleFontSize: 18,
							titleColor: "#1a1a1a",
							headerBg: "#ffffff",
							contentBg: "#ffffff",
						},
					},
				}}
			>
				{contextHolder}

				<div className="flex items-center justify-between mb-2">
					<h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
						<ChatBubbleLeftRightIcon className="h-7 w-7 text-gray-400" />
						Mes messages
					</h1>
					{canComposeNew && (
						<button
							onClick={() => {
								setComposeRecipient(null);
								setComposeSubject("");
								setComposeContent("");
								setUserSearch("");
								setComposeOpen(true);
							}}
							className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-univers text-white text-sm font-bold hover:bg-univers/90 transition-colors shadow-sm"
						>
							<PlusIcon className="h-4 w-4" />
							Nouveau message
						</button>
					)}
				</div>
				<p className="text-gray-500 mb-8">Consultez et gérez vos messages internes.</p>

				{/* Tabs */}
				<div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
					<button
						onClick={() => setActiveTab("inbox")}
						className={clsx(
							"px-4 py-2 rounded-md text-sm font-semibold transition-colors flex items-center gap-2",
							activeTab === "inbox" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
						)}
					>
						<InboxIcon className="h-4 w-4" />
						Reçus
					</button>
					<button
						onClick={() => setActiveTab("sent")}
						className={clsx(
							"px-4 py-2 rounded-md text-sm font-semibold transition-colors flex items-center gap-2",
							activeTab === "sent" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
						)}
					>
						<PaperAirplaneIcon className="h-4 w-4" />
						Envoyés
					</button>
				</div>

				{/* Messages list */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-200">
					{loading ? (
						<div className="flex justify-center py-12">
							<Spin indicator={<LoadingOutlined spin className="text-2xl text-gray-400" />} />
						</div>
					) : messages.length === 0 ? (
						<div className="text-center py-12">
							<EnvelopeIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
							<p className="text-gray-500">Aucun message {activeTab === "inbox" ? "reçu" : "envoyé"}.</p>
						</div>
					) : (
						<div className="divide-y divide-gray-100">
							{messages.map((msg) => {
								const person = activeTab === "inbox" ? msg.senderUser : msg.recipientUser;
								const isUnread = activeTab === "inbox" && (msg.unreadInThread ? msg.unreadInThread > 0 : !msg.isRead);
								return (
									<button
										key={msg._id}
										onClick={() => handleOpenConversation(msg)}
										className={clsx(
											"w-full text-left px-5 py-4 hover:bg-gray-50 transition-colors flex items-start gap-4",
											isUnread && "bg-univers/[0.03]"
										)}
									>
										<div className="flex-shrink-0 mt-0.5">
											{isUnread ? (
												<EnvelopeIcon className="h-5 w-5 text-univers" />
											) : (
												<EnvelopeOpenIcon className="h-5 w-5 text-gray-300" />
											)}
										</div>
										<div className="min-w-0 flex-1">
											<div className="flex items-center justify-between gap-2 mb-0.5">
												<span className={clsx("text-sm truncate", isUnread ? "font-bold text-gray-900" : "font-medium text-gray-700")}>
													{person ? `${person.firstName} ${person.lastName}` : "Utilisateur supprimé"}
												</span>
												<div className="flex items-center gap-2 flex-shrink-0">
													{msg.threadCount && msg.threadCount > 1 && (
														<span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full font-medium">
															{msg.threadCount}
														</span>
													)}
													<span className="text-xs text-gray-400">
														{new Date(msg.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
													</span>
												</div>
											</div>
											<p className={clsx("text-sm truncate", isUnread ? "font-semibold text-gray-900" : "text-gray-700")}>
												{msg.subject}
											</p>
											<p className="text-xs text-gray-400 truncate mt-0.5">{msg.content}</p>
										</div>
										{isUnread && (
											<span className="flex items-center gap-1 flex-shrink-0 mt-2">
												{activeTab === "inbox" && msg.unreadInThread && msg.unreadInThread > 0 ? (
													<span className="min-w-[20px] h-5 flex items-center justify-center rounded-full bg-cohesion text-white text-xs font-bold px-1.5">
														{msg.unreadInThread}
													</span>
												) : (
													<span className="w-2.5 h-2.5 rounded-full bg-univers" />
												)}
											</span>
										)}
									</button>
								);
							})}
						</div>
					)}

					{/* Pagination */}
					{pagination && pagination.pages > 1 && (
						<div className="flex justify-center gap-2 py-4 border-t border-gray-100">
							{Array.from({ length: pagination.pages }, (_, i) => (
								<button
									key={i + 1}
									onClick={() => loadMessages(i + 1)}
									className={clsx(
										"px-3 py-1 rounded text-sm font-medium",
										pagination.page === i + 1 ? "bg-univers text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
									)}
								>
									{i + 1}
								</button>
							))}
						</div>
					)}
				</div>

				{/* Conversation Thread Modal */}
				<Modal
					title={null}
					open={conversationOpen}
					onCancel={() => setConversationOpen(false)}
					footer={null}
					width="min(680px, 95vw)"
					centered
					destroyOnClose
					styles={{ body: { padding: 0 } }}
				>
					<div className="mt-2">
						<h3 className="text-lg font-bold text-gray-900 mb-4 px-1">{conversationSubject}</h3>

						{conversationLoading ? (
							<div className="flex justify-center py-12">
								<Spin indicator={<LoadingOutlined spin className="text-2xl text-gray-400" />} />
							</div>
						) : (
							<>
								{/* Messages thread */}
								<div className="max-h-[400px] overflow-y-auto space-y-3 mb-4 px-1">
									{conversationMessages.map((msg) => {
										const isMine = msg.senderUser._id === user?._id;
										return (
											<div key={msg._id} className={clsx("flex", isMine ? "justify-end" : "justify-start")}>
												<div
													className={clsx(
														"max-w-[80%] rounded-xl px-4 py-3",
														isMine ? "bg-univers/10 border border-univers/20" : "bg-gray-50 border border-gray-200"
													)}
												>
													<div className="flex items-center gap-2 mb-1">
														<span className="text-xs font-semibold text-gray-700">
															{msg.senderUser.firstName} {msg.senderUser.lastName}
														</span>
														<span className="text-xs text-gray-400">
															{new Date(msg.createdAt).toLocaleDateString("fr-FR", {
																day: "numeric",
																month: "short",
																hour: "2-digit",
																minute: "2-digit",
															})}
														</span>
													</div>
													<p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
														{msg.content}
													</p>
												</div>
											</div>
										);
									})}
									<div ref={conversationEndRef} />
								</div>

								{/* Reply form */}
								<form onSubmit={submitReply} className="border-t border-gray-100 pt-4 px-1">
									<div className="flex flex-col sm:flex-row gap-3">
										<textarea
											value={replyContent}
											onChange={(e) => setReplyContent(e.target.value)}
											placeholder="Écrivez votre réponse..."
											rows={2}
											disabled={replying}
											className={clsx(inputClass, "resize-none flex-1")}
										/>
										<button
											type="submit"
											disabled={replying || !replyContent.trim()}
											className={clsx(
												replying || !replyContent.trim() ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:bg-univers/90",
												"px-4 py-2.5 rounded-lg text-sm font-bold text-white bg-univers shadow-sm transition-all duration-200 flex items-center gap-2 self-end"
											)}
										>
											{replying ? (
												<Spin indicator={<LoadingOutlined spin className="text-base text-white" />} />
											) : (
												<>
													<ArrowUturnLeftIcon className="h-4 w-4" />
													Répondre
												</>
											)}
										</button>
									</div>
								</form>
							</>
						)}
					</div>
				</Modal>

				{/* Compose Modal (admin) */}
				{canComposeNew && (
					<Modal
						title="Nouveau message"
						open={composeOpen}
						onCancel={() => !composeSending && setComposeOpen(false)}
						footer={null}
						width="min(600px, 95vw)"
						centered
						destroyOnClose
					>
						<form onSubmit={submitCompose} className="space-y-4 mt-4">
							<div>
								<label className="text-sm font-semibold text-gray-700 mb-1 block">
									Destinataire<span className="text-red-400 ml-1">*</span>
								</label>
								{composeRecipient ? (
									<div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-200">
										<span className="text-sm font-medium text-gray-900">
											{composeRecipient.firstName} {composeRecipient.lastName}
											<span className="text-gray-400 ml-2">({composeRecipient.email})</span>
										</span>
										<button
											type="button"
											onClick={() => {
												setComposeRecipient(null);
												setUserSearch("");
											}}
											className="text-xs text-red-500 hover:text-red-700 font-medium"
										>
											Changer
										</button>
									</div>
								) : (
									<div className="relative">
										<MagnifyingGlassIcon className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
										<input
											type="text"
											value={userSearch}
											onChange={(e) => setUserSearch(e.target.value)}
											placeholder="Rechercher un utilisateur..."
											className="pl-9 pr-4 py-2.5 w-full rounded-lg text-sm text-gray-900 bg-white border border-gray-300 focus:border-univers focus:ring-2 focus:ring-univers/20"
										/>
										{userSearchLoading && (
											<div className="absolute right-3 top-1/2 -translate-y-1/2">
												<Spin indicator={<LoadingOutlined spin className="text-sm text-gray-400" />} />
											</div>
										)}
										{userResults.length > 0 && (
											<div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
												{userResults.map((u: any) => (
													<button
														key={u._id}
														type="button"
														onClick={() => {
															setComposeRecipient(u);
															setUserSearch("");
															setUserResults([]);
														}}
														className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm flex items-center justify-between"
													>
														<span className="font-medium text-gray-900">
															{u.firstName} {u.lastName}
														</span>
														<span className="text-xs text-gray-400">{roleLabels[u.role] || u.role}</span>
													</button>
												))}
											</div>
										)}
									</div>
								)}
							</div>
							<div>
								<label className="text-sm font-semibold text-gray-700 mb-1 block">
									Sujet<span className="text-red-400 ml-1">*</span>
								</label>
								<input
									type="text"
									value={composeSubject}
									onChange={(e) => setComposeSubject(e.target.value)}
									placeholder="Sujet du message"
									disabled={composeSending}
									className={inputClass}
								/>
							</div>
							<div>
								<label className="text-sm font-semibold text-gray-700 mb-1 block">
									Message<span className="text-red-400 ml-1">*</span>
								</label>
								<textarea
									value={composeContent}
									onChange={(e) => setComposeContent(e.target.value)}
									placeholder="Écrivez votre message..."
									rows={6}
									disabled={composeSending}
									className={clsx(inputClass, "resize-none")}
								/>
							</div>
							<div className="flex justify-end gap-3 pt-2">
								<button
									type="button"
									onClick={() => setComposeOpen(false)}
									disabled={composeSending}
									className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
								>
									Annuler
								</button>
								<button
									type="submit"
									disabled={composeSending || !composeRecipient || !composeSubject.trim() || !composeContent.trim()}
									className={clsx(
										composeSending || !composeRecipient || !composeSubject.trim() || !composeContent.trim()
											? "cursor-not-allowed opacity-70"
											: "cursor-pointer hover:bg-univers/90",
										"px-4 py-2.5 rounded-lg text-sm font-bold text-white bg-univers shadow-sm transition-all duration-200 flex items-center gap-2"
									)}
								>
									{composeSending ? (
										<Spin indicator={<LoadingOutlined spin className="text-base text-white" />} />
									) : (
										<>
											<PaperAirplaneIcon className="h-4 w-4" />
											Envoyer
										</>
									)}
								</button>
							</div>
						</form>
					</Modal>
				)}
			</ConfigProvider>
		</div>
	);
}
