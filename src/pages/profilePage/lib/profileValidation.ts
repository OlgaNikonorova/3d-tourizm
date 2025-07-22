import { z } from "zod";

export const profileSchema = z.object({
  login: z
    .string()
    .min(3, "Псевдоним должен быть не менее 3 символов")
    .optional(),

  password: z
    .string()
    .min(8, "Пароль должен содержать не менее 8 символов")
    .regex(/[a-zA-Z]/, "Пароль должен содержать хотя бы одну букву")
    .optional(),

  email: z
    .string()
    .regex(/^\S+@\S+\.\S+$/, "Введите корректную электронную почту")
    .optional(),

  firstName: z
    .string()
    .min(2, "Имя должно иметь не менее 2 символов")
    .regex(/^[A-ZА-ЯЁ][a-zа-яё]+$/, "Имя должно начинаться с заглавной буквы")
    .optional(),

  lastName: z
    .string()
    .min(3, "Фамилия должна иметь не менее 3 символов")
    .regex(
      /^[A-ZА-ЯЁ][a-zа-яё]+$/,
      "Фамилия должна начинаться с заглавной буквы"
    )
    .optional(),

  address: z
    .string()
    .min(10, "Адрес должен быть не менее 10 символов")
    .optional(),

  profilePictureId: z
    .string()
    .min(1, "ID изображения должен содержать не менее 1 символа")
    .optional(),

  phone: z
    .string()
    .regex(
      /^((8|\+374|\+994|\+995|\+375|\+7|\+380|\+38|\+996|\+998|\+993)[ ]?)?\(?\d{3,5}\)?[ ]?\d{1}[ ]?\d{1}[ ]?\d{1}[ ]?\d{1}[ ]?\d{1}(([ ]?\d{1})?[ ]?\d{1})?$/,
      "Введите корректный номер телефона"
    )
    .optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
