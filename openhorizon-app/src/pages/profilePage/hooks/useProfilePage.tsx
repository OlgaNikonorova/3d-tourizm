import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
} from "../../../entities/user/api/userApi";
import {
  useGetFileByIdQuery,
  useUploadFileMutation,
} from "../../../features/files/api/filesApi";
import { useLogoutUserMutation } from "../../../features/auth/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { ProfileFormData, profileSchema } from "../lib/profileValidation";
import UpdateUser from "../../../entities/user/models/updateUser";
import { logout } from "../../../entities/user/store/userSlice";
import { RootState } from "../../../app/store/store";
import { v4 as uuidv4 } from "uuid";
import { showErrorToast, showSuccessToast } from "../../../shared/ui/toast";

export const useProfilePage = () => {
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);
  const [updateUser] = useUpdateUserByIdMutation();
  const [uploadFile] = useUploadFileMutation();
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.userId);
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserByIdQuery(userId!, {
    skip: !userId,
    refetchOnMountOrArgChange: true,
  });

  const { data: avatar, refetch: refetchPhoto } = useGetFileByIdQuery(user?.profilePictureId ?? "", {
    skip: !user,
    refetchOnMountOrArgChange: true,
  });

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: user?.email,
      password: user?.passwordHash,
      login: user?.login,
      firstName: user?.firstName,
      lastName: user?.lastName,
      phone: user?.phone,
    },
  });

  useEffect(() => {
    if (user && !isPasswordEditable) {
      form.reset({
        email: user.email,
        password: user.passwordHash,
        login: user.login,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
      });
    }
  }, [form, isPasswordEditable, user]);

  const handleUpdateProfile = async (data: ProfileFormData) => {
    if (!user) return;

    const cleanData = {
      passwordHash: data.password ?? undefined,
      email: data.email ?? undefined,
      login: data.login ?? undefined,
      firstName: data.firstName ?? undefined,
      lastName: data.lastName ?? undefined,
      phone: data.phone ?? undefined,
    };

    const updateData: UpdateUser = {
      ...cleanData,
      role: user.role,
      profilePictureId: user.profilePictureId
    };

    if (!isPasswordEditable) {
      updateData.passwordHash = user.passwordHash;
    }

    try {
      await updateUser({ id: user.id, updateUser: updateData }).unwrap();
      refetch();
      refetchPhoto()
      showSuccessToast("Профиль успешно обновлен");
    } catch (err) {
      showErrorToast(`Ошибка при обновлении профиля: ${err}`);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file || !user) return;

      if (!file.type.startsWith("image/")) {
        alert("Пожалуйста, выберите изображение");
        return;
      }

      const MAX_SIZE = 5 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        alert("Файл слишком большой. Максимальный размер: 5MB");
        return;
      }

      const formData = new FormData();
      formData.append("inputFile", file);

      const result = await uploadFile({
        formData: formData,
        id: uuidv4(),
        name: file.name,
        type: file.type,
      }).unwrap();

      const cleanData = {
        email: user.email ?? undefined,
        passwordHash: user.passwordHash ?? undefined,
        login: user.login ?? undefined,
        firstName: user.firstName ?? undefined,
        lastName: user.lastName ?? undefined,
        phone: user.phone ?? undefined,
      };

      const updateData: UpdateUser = {
        ...cleanData,
        role: user.role,
        profilePictureId: result.id,
      };

      try {
        await updateUser({ id: user!.id, updateUser: updateData }).unwrap();
        refetch();
        refetchPhoto()
        showSuccessToast("Аватар успешно обновлен");
      } catch (err) {
        showErrorToast(`Ошибка при обновлении аватара: ${err}`);
      }
    } catch (err) {
      showErrorToast("Не удалось загрузить аватар. Пожалуйста, попробуйте ещё раз.");
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
  };

  return {
    user,
    form,
    isLoading,
    error,
    handleUpdateProfile,
    handleAvatarChange,
    handleLogout,
    isPasswordEditable,
    setIsPasswordEditable,
    avatarBase64: avatar?.data,
  };
};
