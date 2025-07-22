import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  TextField,
  Button,
  Stack,
  Avatar,
  IconButton,
  Box,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { UserRole } from "../../../entities/user/models/userRole";
import UpdateUser from "../../../entities/user/models/updateUser";
import UpdateUserAvatar from "../../../entities/user/models/updateUserAvatar";

const userProfileSchema = z.object({
  email: z.string().email("Некорректный email").min(1, "Обязательное поле"),
  passwordHash: z
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .optional(),
  login: z.string().min(3, "Логин должен содержать минимум 3 символа"),
  firstName: z.string().min(1, "Обязательное поле"),
  lastName: z.string().min(1, "Обязательное поле"),
  phone: z.string().min(11, "Некорректный номер телефона"),
  role: z.nativeEnum(UserRole),
});

type UserProfileFormValues = z.infer<typeof userProfileSchema>;

interface ProfileFormProps {
  user: {
    id: string;
    email: string;
    login: string;
    firstName: string;
    lastName: string;
    phone: string;
    avatar: string;
    role: UserRole;
    passwordHash: string;
  };
  onSubmitUser: (values: UpdateUser) => void;
  onSubmitAvatar: (values: UpdateUserAvatar) => void;
}

const ProfileForm = ({
  user,
  onSubmitUser,
  onSubmitAvatar,
}: ProfileFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      email: user.email,
      login: user.login,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role,
      passwordHash: user.passwordHash,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onSubmitAvatar({ avatar: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (data: UserProfileFormValues) => {
    const updateData: UpdateUser = {
      email: data.email,
      passwordHash: data.passwordHash,
      login: data.login,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      role: data.role,
    };
    onSubmitUser(updateData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing={3}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            src={user.avatar || "/default-avatar.png"}
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <input
            accept="image/*"
            id="avatar-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label htmlFor="avatar-upload">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </Box>

        <TextField
          label="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email")}
          fullWidth
        />

        <TextField
          label="Пароль"
          type="passwordHash"
          error={!!errors.passwordHash}
          helperText={
            errors.passwordHash?.message || "Оставьте пустым, если не хотите менять"
          }
          {...register("passwordHash")}
          fullWidth
        />

        <TextField
          label="Логин"
          error={!!errors.login}
          helperText={errors.login?.message}
          {...register("login")}
          fullWidth
        />

        <TextField
          label="Имя"
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          {...register("firstName")}
          fullWidth
        />

        <TextField
          label="Фамилия"
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          {...register("lastName")}
          fullWidth
        />

        <TextField
          label="Телефон"
          error={!!errors.phone}
          helperText={errors.phone?.message}
          {...register("phone")}
          fullWidth
        />

        <input type="hidden" {...register("role")} />

        <Button type="submit" variant="contained" color="primary" size="large">
          Сохранить изменения
        </Button>
      </Stack>
    </form>
  );
};

export default ProfileForm;
