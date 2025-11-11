/**
 * ESLint Recommended Practice:
 * Assign object to a variable before exporting as module default (import/no-anonymous-default-export)
 */
const prettierConfig = {
	// 是否使用制表符 (tabs) 而不是空格 (spaces)
	useTabs: true,
	// 是否在语句末尾打印分号 (semicolons)
	semi: true,
	// 是否在字符串中使用单引号 (single quotes) 而不是双引号 (double quotes)
	singleQuote: true,
	// HTML、CSS 和 Vue <template> 中空格的敏感度
	htmlWhitespaceSensitivity: 'css',
	// 是否启用 ESLint 集成 (通常在 Prettier config 中禁用)
	eslintIntegration: false,
	// 是否在对象的花括号 ({}) 内打印空格
	bracketSpacing: true,
};

// 导出命名的变量，而不是匿名对象
export default prettierConfig;
