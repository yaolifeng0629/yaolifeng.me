import fs from 'fs';
import path from 'path';

import { marked } from 'marked';

const markdownDir = path.join(process.cwd(), 'src/data/posts/markdown');
const outputDir = path.join(process.cwd(), 'src/data/posts/parsed');
const assetsDir = 'src/data/posts/assets';

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 自定义渲染器来处理图片路径
const renderer = new marked.Renderer();
const originalImageRenderer = renderer.image;
renderer.image = (href, title, text) => {
    if (!href.startsWith('http')) {
        // 更新本地图片路径
        href = path.join(assetsDir, href);
    }
    return originalImageRenderer.call(renderer, href, title, text);
};

// 读取并解析Markdown文件
fs.readdir(markdownDir, (err, files) => {
    if (err) {
        console.error('Error reading markdown directory:', err);
        return;
    }

    files.forEach((file) => {
        if (path.extname(file) === '.md') {
            const filePath = path.join(markdownDir, file);
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error(`Error reading file ${file}:`, err);
                    return;
                }

                // 解析Markdown为HTML
                const html = marked(data, { renderer });

                // 保存到JSON文件
                const outputFilePath = path.join(outputDir, `${path.basename(file, '.md')}.json`);
                const outputData = JSON.stringify({ content: html });
                fs.writeFile(outputFilePath, outputData, (err) => {
                    if (err) {
                        console.error(`Error writing file ${outputFilePath}:`, err);
                    } else {
                        console.log(`File ${outputFilePath} has been saved.`);
                    }
                });
            });
        }
    });
});
