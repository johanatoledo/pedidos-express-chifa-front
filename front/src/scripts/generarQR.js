import QRCode from "qrcode";

const urlMenu = "https://pedido.tonav-tech.online";

QRCode.toFile("qr-menu-chifa.png", urlMenu, {
  width: 1000,
  margin: 2,
});