# 🎱 Tombala Game (Modül)

Bu proje, **GameCenter** platformunda çalışan bağımsız bir **Tombala oyun modülüdür**. Çok oyunculu, WebSocket tabanlı ve gerçek zamanlı olarak çalışan oyun yapısı sayesinde birden fazla oyuncu aynı lobide senkronize şekilde oynayabilir.

## 📦 Özellikler

* Bağımsız bir oyun paketi olarak yapılandırıldı (Lerna monorepo yapısına uygun)
* `dist/` klasörüne Babel ile derlenir ve GameCenter platformuna aktarılır
* React bileşenleri ve oyun mantığı ayrı tutulmuştur
* Çok oyunculu destek (tek socket bağlantısı üzerinden)
* Oyun içi ses, animasyon ve ayarlar desteği


## 🔧 Kurulum ve Entegrasyon

1. Bu klasör (`tombala-game`) ana platform klasörü (`Platform/`) ile aynı seviyede olmalıdır:
   Platform/
   ├── gamecenter/
   └── tombala-game/

2. Ana dizinde terminali açıp bağımlılıkları yükleyin:
   npm install

3. Tombala modülünü derlemek için:
   npm run build --workspace tombala-game

> Derleme sonucu `dist/` klasörüne aktarılır ve `@gamecenter/tombala` olarak kullanılabilir hale gelir.

## 👨‍💻 Geliştirici

Kerem Yunus Parlakyiğit
Sakarya Üniversitesi – Bilgisayar Mühendisliği

## 🔗 Daha fazla bilgi için: 

Ana platform yapısı, kurulum detayları ve genel proje açıklamaları için lütfen GameCenter README dosyasına bakınız.
