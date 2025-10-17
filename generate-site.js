const fs = require('fs');
const path = require('path');

console.log('✅ サイト生成を開始します...');

// --- 準備 ---
const templateHtml = fs.readFileSync('template.html', 'utf-8');
const customerData = JSON.parse(fs.readFileSync('customer-data.json', 'utf-8'));
const outputDir = 'dist'; // 完成品を保存するフォルダ名

// --- メイン処理 ---
// 1. テンプレートの各プレースホルダーを、実際のデータで置換する
let finalHtml = templateHtml;

// SNSリンクの特別処理
// 1) customer-data.json に sns 配列があればそれを優先（[{ label, url, icon }]）
// 2) なければ従来のキー（instagram_url など）を使って自動生成
const snsConfig = {
  instagram: { url: 'instagram_url', icon: 'Instagram.png', label: 'Instagram' },
  line: { url: 'line_url', icon: 'LINE copy.png', label: 'LINE' },
  x: { url: 'x_url', icon: 'X画像 copy.jpg', label: 'X' },
  facebook: { url: 'facebook_url', icon: 'facebook_icon copy.png', label: 'Facebook' },
  youtube: { url: 'youtube_url', icon: 'youtube.png', label: 'YouTube' },
  tiktok: { url: 'tiktok_url', icon: 'TikTok.jpg', label: 'TikTok' },
  threads: { url: 'threads_url', icon: 'Threads.png', label: 'Threads' }
};

let snsLinks = [];
if (Array.isArray(customerData.sns)) {
  // debug removed
  snsLinks = customerData.sns
    .filter(i => i && typeof i.url === 'string' && i.url.trim() !== '')
    .map(i => {
      const label = i.label || 'SNS';
      let iconPath = i.icon && i.icon.trim() !== '' ? i.icon.trim() : 'Instagram.png';
      if (iconPath.startsWith('images/')) {
        iconPath = iconPath.replace(/^images\//, '');
      }
      // アイコンファイル名のマッピング（存在する実ファイル名へ変換）
      const iconMapping = {
        'icon_instagram.svg': 'Instagram.png',
        'icon_line.svg': 'LINE copy.png',
        'icon_x.svg': 'X画像 copy.jpg',
        'icon_facebook.svg': 'facebook_icon copy.png',
        'icon_youtube.svg': 'youtube.png',
        'icon_tiktok.svg': 'TikTok.jpg',
        'icon_threads.svg': 'Threads.png'
      };
      const finalIconPath = iconMapping[iconPath] || iconPath;

      return `<a class="sns-btn" href="${i.url}" target="_blank" rel="noopener" aria-label="${label}">
            <img src="images/${finalIconPath}" alt="${label}">
            <span class="label">${label}</span>
          </a>`;
    });
} else {
  for (const [, config] of Object.entries(snsConfig)) {
    if (customerData[config.url] && customerData[config.url].trim() !== '') {
      snsLinks.push(`<a class="sns-btn" href="${customerData[config.url]}" target="_blank" rel="noopener" aria-label="${config.label}">
            <img src="images/${config.icon}" alt="${config.label}">
            <span class="label">${config.label}</span>
          </a>`);
    }
  }
}

// SNSアイコンの数に応じてdata-count属性を設定
const snsCount = snsLinks.length;
const snsGridHtml = `<div class="sns-grid" data-count="${snsCount}">
          ${snsLinks.join('\n          ')}
        </div>`;
finalHtml = finalHtml.replace('{{ sns_links }}', snsGridHtml);

// ギャラリー画像の特別処理
if (customerData.gallery_images && Array.isArray(customerData.gallery_images)) {
  const galleryHtml = customerData.gallery_images.map(img => 
    `<img src="${img}" alt="${path.basename(img, path.extname(img))}">`
  ).join('\n          ');
  finalHtml = finalHtml.replace('{{ gallery_images }}', galleryHtml);
}

// その他のプレースホルダーを置換
const excludedKeys = ['gallery_images', 'sns_links', 'sns', ...Object.keys(snsConfig).map(k => snsConfig[k].url)];
for (const key in customerData) {
  if (!excludedKeys.includes(key)) {
    const placeholder = new RegExp(`{{ ${key} }}`, 'g');
    finalHtml = finalHtml.replace(placeholder, customerData[key]);
  }
}

// 2. 完成品を保存する'dist'フォルダがなければ作成する
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

// 3. 'dist'フォルダ内に、完成品である'index.html'を書き出す
fs.writeFileSync(path.join(outputDir, 'index.html'), finalHtml);

// 4. サイトに必要な他のファイル（CSSや画像）もdistフォルダにコピーする
if (fs.existsSync('styles.css')) {
  fs.copyFileSync('styles.css', path.join(outputDir, 'styles.css'));
}
if (fs.existsSync('images')) {
  fs.cpSync('images', path.join(outputDir, 'images'), { recursive: true });
}
if (fs.existsSync('manifest.json')) {
  fs.copyFileSync('manifest.json', path.join(outputDir, 'manifest.json'));
}
if (fs.existsSync('sw.js')) {
  fs.copyFileSync('sw.js', path.join(outputDir, 'sw.js'));
}

console.log(`🎉 サイト生成が完了しました！ '${outputDir}' フォルダの中に完成品が作られました。`);
