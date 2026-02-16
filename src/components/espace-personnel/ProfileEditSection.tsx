"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { updateMyProfile, changeMyPassword } from "@/lib/authApi";
import { notification, ConfigProvider, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { CheckCircleIcon, XCircleIcon, PencilSquareIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

type NotificationType = "success" | "error";

const inputClass =
	"block w-full rounded-lg px-4 py-2.5 text-gray-900 bg-white border border-gray-300 focus:border-univers focus:ring-2 focus:ring-univers/20 shadow-sm placeholder:text-gray-400 text-sm font-medium transition-all duration-200";

export default function ProfileEditSection() {
	const { user, refreshUser } = useAuth();
	const [api, contextHolder] = notification.useNotification();

	// Profile form
	const [editing, setEditing] = useState(false);
	const [saving, setSaving] = useState(false);
	const [form, setForm] = useState({
		firstName: user?.firstName || "",
		lastName: user?.lastName || "",
		phone: user?.phone || "",
		company: user?.company || "",
		position: user?.position || "",
		address: user?.address || "",
	});

	// Password form
	const [changingPassword, setChangingPassword] = useState(false);
	const [savingPassword, setSavingPassword] = useState(false);
	const [passwordForm, setPasswordForm] = useState({
		currentPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	});

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

	const handleStartEdit = () => {
		setForm({
			firstName: user?.firstName || "",
			lastName: user?.lastName || "",
			phone: user?.phone || "",
			company: user?.company || "",
			position: user?.position || "",
			address: user?.address || "",
		});
		setEditing(true);
	};

	const handleSaveProfile = async (e: React.FormEvent) => {
		e.preventDefault();
		setSaving(true);
		try {
			await updateMyProfile(form);
			await refreshUser();
			openNotification("success", "Profil mis à jour", "Vos informations ont été enregistrées.");
			setEditing(false);
		} catch (error: any) {
			openNotification("error", "Erreur", error.response?.data?.error || "Erreur lors de la mise à jour.");
		} finally {
			setSaving(false);
		}
	};

	const handleChangePassword = async (e: React.FormEvent) => {
		e.preventDefault();
		if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
			openNotification("error", "Erreur", "Les nouveaux mots de passe ne correspondent pas.");
			return;
		}
		if (passwordForm.newPassword.length < 8) {
			openNotification("error", "Erreur", "Le nouveau mot de passe doit contenir au moins 8 caractères.");
			return;
		}
		setSavingPassword(true);
		try {
			await changeMyPassword(passwordForm);
			openNotification("success", "Mot de passe modifié", "Votre mot de passe a été changé avec succès.");
			setChangingPassword(false);
			setPasswordForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
		} catch (error: any) {
			openNotification("error", "Erreur", error.response?.data?.error || "Erreur lors du changement de mot de passe.");
		} finally {
			setSavingPassword(false);
		}
	};

	return (
		<ConfigProvider
			theme={{
				token: {
					colorBgElevated: "#ffffff",
					colorTextHeading: "#1a1a1a",
					colorText: "#374151",
					fontFamily: "Halibut",
				},
			}}
		>
			{contextHolder}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				<div className="flex items-center justify-between mb-4">
					<h3 className="font-bold text-gray-900 flex items-center gap-2">
						<PencilSquareIcon className="h-5 w-5 text-gray-400" />
						Mon profil
					</h3>
					{!editing && (
						<button
							onClick={handleStartEdit}
							className="text-sm text-univers hover:underline font-semibold"
						>
							Modifier
						</button>
					)}
				</div>

				{editing ? (
					<form onSubmit={handleSaveProfile} className="space-y-4">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div>
								<label className="text-sm font-semibold text-gray-700 mb-1 block">Prénom</label>
								<input
									type="text"
									value={form.firstName}
									onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
									disabled={saving}
									className={inputClass}
								/>
							</div>
							<div>
								<label className="text-sm font-semibold text-gray-700 mb-1 block">Nom</label>
								<input
									type="text"
									value={form.lastName}
									onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))}
									disabled={saving}
									className={inputClass}
								/>
							</div>
							<div>
								<label className="text-sm font-semibold text-gray-700 mb-1 block">Téléphone</label>
								<input
									type="text"
									value={form.phone}
									onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
									disabled={saving}
									className={inputClass}
								/>
							</div>
							<div>
								<label className="text-sm font-semibold text-gray-700 mb-1 block">Entreprise</label>
								<input
									type="text"
									value={form.company}
									onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
									disabled={saving}
									className={inputClass}
								/>
							</div>
							<div>
								<label className="text-sm font-semibold text-gray-700 mb-1 block">Poste</label>
								<input
									type="text"
									value={form.position}
									onChange={(e) => setForm((p) => ({ ...p, position: e.target.value }))}
									disabled={saving}
									className={inputClass}
								/>
							</div>
							<div>
								<label className="text-sm font-semibold text-gray-700 mb-1 block">Adresse</label>
								<input
									type="text"
									value={form.address}
									onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
									disabled={saving}
									className={inputClass}
								/>
							</div>
						</div>
						<div className="flex justify-end gap-3 pt-2">
							<button
								type="button"
								onClick={() => setEditing(false)}
								disabled={saving}
								className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
							>
								Annuler
							</button>
							<button
								type="submit"
								disabled={saving}
								className={clsx(
									saving ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:bg-univers/90",
									"px-4 py-2 rounded-lg text-sm font-bold text-white bg-univers shadow-sm transition-all duration-200 flex items-center gap-2"
								)}
							>
								{saving ? <Spin indicator={<LoadingOutlined spin className="text-base text-white" />} /> : "Enregistrer"}
							</button>
						</div>
					</form>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
						<div>
							<span className="text-gray-400">Email</span>
							<p className="text-gray-900 font-medium">{user?.email}</p>
						</div>
						<div>
							<span className="text-gray-400">Téléphone</span>
							<p className="text-gray-900 font-medium">{user?.phone || "—"}</p>
						</div>
						<div>
							<span className="text-gray-400">Prénom</span>
							<p className="text-gray-900 font-medium">{user?.firstName}</p>
						</div>
						<div>
							<span className="text-gray-400">Nom</span>
							<p className="text-gray-900 font-medium">{user?.lastName}</p>
						</div>
						<div>
							<span className="text-gray-400">Entreprise</span>
							<p className="text-gray-900 font-medium">{user?.company || "—"}</p>
						</div>
						<div>
							<span className="text-gray-400">Poste</span>
							<p className="text-gray-900 font-medium">{user?.position || "—"}</p>
						</div>
						<div className="sm:col-span-2">
							<span className="text-gray-400">Adresse</span>
							<p className="text-gray-900 font-medium">{user?.address || "—"}</p>
						</div>
					</div>
				)}

				{/* Changement de mot de passe */}
				<div className="mt-6 pt-6 border-t border-gray-200">
					{changingPassword ? (
						<form onSubmit={handleChangePassword} className="space-y-4">
							<h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
								<LockClosedIcon className="h-4 w-4 text-gray-400" />
								Changer le mot de passe
							</h4>
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
								<div>
									<label className="text-sm font-semibold text-gray-700 mb-1 block">Mot de passe actuel</label>
									<input
										type="password"
										value={passwordForm.currentPassword}
										onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))}
										disabled={savingPassword}
										className={inputClass}
									/>
								</div>
								<div>
									<label className="text-sm font-semibold text-gray-700 mb-1 block">Nouveau mot de passe</label>
									<input
										type="password"
										value={passwordForm.newPassword}
										onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))}
										disabled={savingPassword}
										className={inputClass}
									/>
								</div>
								<div>
									<label className="text-sm font-semibold text-gray-700 mb-1 block">Confirmer</label>
									<input
										type="password"
										value={passwordForm.confirmNewPassword}
										onChange={(e) => setPasswordForm((p) => ({ ...p, confirmNewPassword: e.target.value }))}
										disabled={savingPassword}
										className={inputClass}
									/>
								</div>
							</div>
							<div className="flex justify-end gap-3">
								<button
									type="button"
									onClick={() => { setChangingPassword(false); setPasswordForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" }); }}
									disabled={savingPassword}
									className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
								>
									Annuler
								</button>
								<button
									type="submit"
									disabled={savingPassword}
									className={clsx(
										savingPassword ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:bg-univers/90",
										"px-4 py-2 rounded-lg text-sm font-bold text-white bg-univers shadow-sm transition-all duration-200 flex items-center gap-2"
									)}
								>
									{savingPassword ? <Spin indicator={<LoadingOutlined spin className="text-base text-white" />} /> : "Changer"}
								</button>
							</div>
						</form>
					) : (
						<button
							onClick={() => setChangingPassword(true)}
							className="text-sm text-univers hover:underline font-semibold flex items-center gap-2"
						>
							<LockClosedIcon className="h-4 w-4" />
							Changer le mot de passe
						</button>
					)}
				</div>
			</div>
		</ConfigProvider>
	);
}
