# 🚀 クイックスタートガイド

## 5分でサイト作成！

### 1. データを編集
`customer-data.json` を開いて、お客様の情報を入力

### 2. 内容を確認
```bash
cat customer-data.json
```

### 3. サイトを生成
```bash
node generate-site.js
```

### 4. 完成！
`dist/index.html` をブラウザで開く

---

## 📝 データ入力例

```json
{
  "shop_name": "カフェ・ド・パリ",
  "shop_bio": "本格フレンチカフェ<br>営業時間: 8:00-18:00",
  "shop_address": "東京都渋谷区神宮前1-2-3",
  "shop_address_url": "https://maps.google.com/...",
  "page_title": "カフェ・ド・パリ",
  "share_title": "カフェ・ド・パリ",
  "share_text": "美味しいコーヒーが楽しめます！",
  "profile_image_url": "images/placeholder_avatar.jpg",
  "background_image_url": "images/placeholder_header.jpg",
  "footer_text": "Café de Paris",
  "sns": [
    {
      "label": "Instagram",
      "url": "https://instagram.com/example",
      "icon": "icon_instagram.svg"
    }
  ]
}
```

## ⚠️ 重要
- データ編集後は必ず保存
- 生成前に `cat customer-data.json` で確認
- 画像は `images/` フォルダに配置

