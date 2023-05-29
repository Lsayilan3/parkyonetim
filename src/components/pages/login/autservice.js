import axios from "axios";

class AuthService {
  constructor() {
    this.baseUrl = "https://api.kapadokyadavet.com/api/Auth"; // API base URL
    this.tokenCheckTimer = null; // Token süresi kontrolü için zamanlayıcı
  }

  login(email, password) {
    return axios
      .post(`${this.baseUrl}/login`, { email, password })
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem("token", response.data.data.token); // Token local storage'a kaydedilir
          localStorage.setItem("claims", JSON.stringify(response.data.data.claims)); // Kullanıcının yetkileri claims olarak kaydedilir
          this.startTokenExpirationCheck(); // Token süresi kontrolü başlatılır
          return response.data;
        }
        throw new Error(response.data.message);
      });
  }

  logout() {
    localStorage.removeItem("token"); // Token local storage'dan silinir
    localStorage.removeItem("claims"); // Kullanıcının yetkileri claims olarak kaydedilir
    this.stopTokenExpirationCheck(); // Token süresi kontrolü durdurulur
  }

  isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token; // Token varsa kullanıcının authenticated olduğunu kabul ediyoruz
  }

  getUserClaims() {
    const claims = localStorage.getItem("claims");
    return JSON.parse(claims);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  startTokenExpirationCheck() {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      const expirationTime = decodedToken.exp * 1000; // Token'in son kullanma zamanı milisaniye cinsinden
      const currentTime = Date.now(); // Mevcut zaman milisaniye cinsinden
      const timeRemaining = expirationTime - currentTime;

      if (timeRemaining > 0) {
        this.tokenCheckTimer = setTimeout(() => {
          this.logout(); // Token süresi dolduğunda otomatik olarak çıkış yap
          // Oturumu kapattıktan sonra yapılması gereken başka bir işlemi buraya ekleyebilirsiniz
          window.location.href = "/";
        }, timeRemaining);
      } else {
        this.logout(); // Token süresi zaten dolduysa otomatik olarak çıkış yap
        // Oturumu kapattıktan sonra yapılması gereken başka bir işlemi buraya ekleyebilirsiniz
        window.location.href = "/";
      }
    }
  }

  stopTokenExpirationCheck() {
    clearTimeout(this.tokenCheckTimer); // Token süresi kontrolü için zamanlayıcıyı durdur
  }

  decodeToken(token) {
    // Token'i çözümleyen bir fonksiyon kullanın, örneğin jwt-decode gibi bir kütüphane kullanabilirsiniz
    // Burada örnek bir çözümleme fonksiyonu kullanılıyor
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const decodedData = JSON.parse(window.atob(base64));
    return decodedData;
  }
}

export default new AuthService();
