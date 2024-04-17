import { ArticleType } from './type';

const getMessageArticle = (body: ArticleType) => {
  const systemContent = `你是一个[作家]，你最擅长写的文章是[${body.value}${body.type}]。`;
  const userContent = `我想写一篇[${body.value}${body.type}]，请你帮我写一篇[${body.value}${body.type}]。`;
  const names = body?.name ? `1.文章的[主旨]是[${body.name}]；` : '';
  const assistantContent =
    '[要求]：' +
    [names] +
    `2.文章分为[四个段落]；3.用[感官描写]、[注重细节]、运用[修辞手法]、[借景抒情]、选择合适的[写作角度]、通过[季节]和[时间]变化注重[情感表达]激发读者[想象]、注意语言的音韵。4.文章的[字数]在[1200字]左右；5.生成对应标题，文章格式严格按照[${body.type}]格式输出。`;
  return [
    { role: 'system', content: systemContent },
    { role: 'assistant', content: userContent + assistantContent },
    // { 'role': 'system', 'content': assistantContent }
  ];
};
export default getMessageArticle;
