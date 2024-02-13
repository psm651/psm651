import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `# Hi there 👋

   ## 이런 환경에 익숙해요✍🏼

   ## 언어

   <p>
	 <img alt="" src= "https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
	   <img alt="" src= "https://img.shields.io/badge/TypeScript-black?logo=typescript&logoColor=blue"/>
	   </p>

	   ## Contact me

	   ## 📕 Latest Blog Posts

	   `;

// rss-parser 생성
const parser = new Parser({
	headers: {
		Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
	}});

(async () => {

	// 피드 목록
	const feed = await parser.parseURL('https://systorage.tistory.com/rss');

	// 최신 5개의 글의 제목과 링크를 가져온 후 text에 추가
	for (let i = 0; i < 5; i++) {
		const {title, link} = feed.items[i];
		console.log(`${i + 1}번째 게시물`);
		console.log(`추가될 제목: ${title}`);
		console.log(`추가될 링크: ${link}`);
		text += `<a href=${link}>${title}</a></br>`;
	}

	// README.md 파일 작성
	writeFileSync('README.md', text, 'utf8', (e) => {
		console.log(e)
	})

	console.log('업데이트 완료')
})();
