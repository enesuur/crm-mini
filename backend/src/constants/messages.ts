enum RATE_LIMIT_MESSAGES {
  COMMON_RATE_LIMIT = "Bu IP'den çok fazla istek gönderildi, lütfen bir saat sonra tekrar deneyin.",
  TOO_FAST = "Çok hızlı istek gönderiyorsunuz. Lütfen biraz yavaşlayın.",
  TEMP_BLOCK = "İstek sınırına ulaştınız. Lütfen 60 dakika sonra tekrar deneyin.",
  SOFT_WARNING = "Biraz hızlısınız. Lütfen kısa bir ara verin.",
  SPAM_WARNING = "IP'nizden olağandışı aktiviteler tespit edildi. Lütfen daha sonra tekrar deneyin.",
  TOO_MANY_ATTEMPTS = "Çok fazla deneme tespit edildi. Erişim geçici olarak kısıtlandı.",
}

enum AUTH_MESSAGES {
  UNAUTHORIZED = "Bu kaynağa erişim yetkiniz yok.",
  INVALID_TOKEN = "Geçersiz veya süresi dolmuş token.",
  LOGIN_REQUIRED = "Bu kaynağa erişmek için giriş yapmalısınız.",
  INVALID_CREDENTIALS = "E-posta veya şifre hatalı.",
  ACCOUNT_LOCKED = "Hesabınız çok sayıda başarısız giriş nedeniyle geçici olarak kilitlendi.",
  TOKEN_EXPIRED = "Oturumunuzun süresi doldu. Lütfen tekrar giriş yapın.",
  FORBIDDEN = "Bu kaynağa erişim izniniz yok.",
  USER_EXISTS = "Bu e-posta ile kayıtlı kullanıcı zaten mevcut.",
  SERVER_ERROR = "Sunucuda bir hata oluştu.",
  MISSING_FIELDS = "Gerekli alanlar eksik.",
  USER_REGISTERED = "Kullanıcı başarıyla kaydedildi.",
  SIGNIN_SUCCESS = "Giriş başarılı.",
  SIGNUP_SUCCESS = "Kayıt başarılı.",
  INVALID_EMAIL = "Geçersiz e-posta adresi.",
  INVALID_PASSWORD = "Şifre en az 6 karakter olmalıdır.",
  SIGNOUT_SUCCESS = "Çıkış başarılı.",
}

enum CUSTOMER_MESSAGES {
  MISSING_FIELDS = "Gerekli alanlar eksik.",
  INVALID_NAME = "Ad en az 2, en fazla 30 karakter olmalıdır.",
  INVALID_EMAIL = "Geçersiz e-posta adresi.",
  INVALID_PHONE = "Telefon numarası en az 10, en fazla 15 rakamdan oluşmalıdır.",
  INVALID_TAG = "Lütfen geçerli bir etiket seçiniz.",
  CUSTOMER_CREATED = "Müşteri başarıyla eklendi.",
  CUSTOMER_DELETED = "Müşteri başarıyla silindi.",
  CUSTOMER_NOT_FOUND = "Müşteri bulunamadı.",
  CUSTOMER_ALREADY_EXIST = "Müşteri zaten kayıtlı.",
  CUSTOMER_EMAIL_EXIST = "Başka bir müşteri bu maili kullanıyor",
  CUSTOMER_UPDATE_SUCCESS = "Müşteri bilgileri başarıyla güncellendi.",
  CUSTOMER_NOTE_UPDATE_SUCCESS = "Müşteri notu başarıyla güncellendi.",
  CUSTOMER_NOTE_TOO_LONG = "Not maksimum 500 karakter uzunluğunda olabilir",
  CUSTOMER_NOTE_DELETED = "Müşteri notu başarıyla silindi",
  CUSTOMER_INVALID_NOTE_DATE = "Geçersiz Tarih",
}

enum GENERAL_MESSAGES {
  SERVER_ERROR = "Beklenmeyen bir sunucu hatası oluştu.",
  NOT_FOUND = "İstenen kaynak bulunamadı.",
  BAD_REQUEST = "İstek geçersiz veya işlenemiyor.",
  SERVICE_UNAVAILABLE = "Servis geçici olarak kullanılamıyor. Lütfen daha sonra tekrar deneyin.",
  TIMEOUT = "İstek zaman aşımına uğradı. Lütfen tekrar deneyin.",
}

export {
  RATE_LIMIT_MESSAGES,
  AUTH_MESSAGES,
  GENERAL_MESSAGES,
  CUSTOMER_MESSAGES,
};
