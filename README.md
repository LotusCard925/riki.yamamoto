# ウェブサイトテンプレート

このテンプレートを使って、簡単に美しいウェブサイトを作成できます。

## 🚀 使い方

### 1. テンプレートをコピー
```bash
# 新しいプロジェクトフォルダを作成
cp -r hecoさんtemplate 新しいサイト名
cd 新しいサイト名
```

### 2. お客様のデータを入力
`customer-data.json` ファイルを編集して、お客様の情報を入力します。

#### 必須項目
```json
{
  "shop_name": "店舗名",
  "shop_bio": "店舗紹介文（営業時間など）",
  "shop_address": "住所",
  "shop_address_url": "GoogleマップのURL",
  "page_title": "ページタイトル",
  "share_title": "共有タイトル",
  "share_text": "共有テキスト",
  "profile_image_url": "プロフィール画像のパス",
  "background_image_url": "背景画像のパス",
  "footer_text": "フッターテキスト"
}
```

#### SNSリンク（任意）
```json
{
  "sns": [
    {
      "label": "Instagram",
      "url": "https://instagram.com/アカウント名",
      "icon": "icon_instagram.svg"
    },
    {
      "label": "LINE",
      "url": "https://line.me/ti/p/ID",
      "icon": "icon_line.svg"
    }
  ]
}
```

### 3. データを確認
```bash
# 入力したデータが正しいか確認
cat customer-data.json
```

### 4. サイトを生成
```bash
# ウェブサイトを生成
node generate-site.js
```

### 5. 完成！
`dist/` フォルダに完成したウェブサイトが生成されます。
`dist/index.html` をブラウザで開いて確認してください。

## 📁 ファイル構成

```
テンプレートフォルダ/
├── template.html          # サイトのテンプレート
├── customer-data.json     # お客様のデータ（編集対象）
├── generate-site.js       # サイト生成スクリプト
├── styles.css            # スタイルシート
├── images/               # 画像ファイル
│   ├── Instagram.png     # SNSアイコン
│   ├── LINE copy.png
│   └── ...
└── dist/                 # 生成されたサイト（出力先）
    └── index.html
```

## 🎨 カスタマイズ

### 画像の追加
1. `images/` フォルダにお客様の画像を配置
2. `customer-data.json` で画像パスを指定

### SNSアイコンの追加
1. 新しいアイコンを `images/` フォルダに追加
2. `customer-data.json` の `sns` 配列に追加

## ⚠️ 注意事項

- `customer-data.json` を編集した後は、必ず保存してください
- サイト生成前に `cat customer-data.json` で内容を確認することを推奨
- 画像ファイルは `images/` フォルダに配置してください

## 🆘 トラブルシューティング

### サイトが正しく生成されない場合
1. `customer-data.json` の内容を確認
   ```bash
   cat customer-data.json
   ```
2. JSONの構文エラーがないか確認
3. 画像パスが正しいか確認

### 画像が表示されない場合
- 画像ファイルが `images/` フォルダに存在するか確認
- ファイル名の大文字小文字を確認
- 画像パスが `images/ファイル名` の形式になっているか確認

## 📞 サポート

問題が発生した場合は、以下を確認してください：
1. Node.jsがインストールされているか
2. `customer-data.json` の内容が正しいか
3. 画像ファイルが正しい場所にあるか