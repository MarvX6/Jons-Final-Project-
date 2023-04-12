import { createGlobalStyle } from "styled-components";
export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

// Define global CSS variables for consistent use throughout the app
:root{
--font-all: 'Press Start 2P', monospace;
--font-headers: 'Press Start 2P', monospace;
--color-white: #FFFFFF;
--color-black: #000000;

}
/* Apply a reset to all HTML elements for consistent styling across browsers */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
/* Set the line-height of the body to 1 for consistent spacing */
body {
	line-height: 1;
    background-color: black;
}
/* Remove bullet points from lists */
ol, ul {
	list-style: none;
}
/* Remove quotation marks from blockquotes and quotes */
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
/* Remove table borders and spacing */
table {
	border-collapse: collapse;
	border-spacing: 0;
}
/* Set font-family and color for paragraphs, list items, and spans */
p,li,span{
font-family: var(--font-all);
color: var(--color-white);
}
/* Set font-family for buttons and labels */
button{
font-family:  var(--font-all);
}
label{
font-family: var(--font-all)
}
/* Set font-family and color for headings */
h1, h2, h3, h4, h5, h6{
font-family: var(--font-headers);
color: var(--color-white);
}
`;


