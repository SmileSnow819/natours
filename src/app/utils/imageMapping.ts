// 旅游图片映射配置
// 这里定义了旅游ID与图片文件的对应关系

const BASE_IMAGE_URL = 'http://localhost:8000/img/tours';

export const tourImageMapping: Record<
	string,
	{
		cover: string;
		images: string[];
	}
> = {
	'5c88fa8cf4afda39709c2955': {
		// 森林探险
		cover: `${BASE_IMAGE_URL}/tour-1-cover.jpg`,
		images: [
			`${BASE_IMAGE_URL}/tour-1-1.jpg`,
			`${BASE_IMAGE_URL}/tour-1-2.jpg`,
			`${BASE_IMAGE_URL}/tour-1-3.jpg`,
		],
	},
	'5c88fa8cf4afda39709c2956': {
		// 海滩度假
		cover: `${BASE_IMAGE_URL}/tour-2-cover.jpg`,
		images: [
			`${BASE_IMAGE_URL}/tour-2-1.jpg`,
			`${BASE_IMAGE_URL}/tour-2-2.jpg`,
			`${BASE_IMAGE_URL}/tour-2-3.jpg`,
		],
	},
	'5c88fa8cf4afda39709c2957': {
		// 山地徒步
		cover: `${BASE_IMAGE_URL}/tour-3-cover.jpg`,
		images: [
			`${BASE_IMAGE_URL}/tour-3-1.jpg`,
			`${BASE_IMAGE_URL}/tour-3-2.jpg`,
			`${BASE_IMAGE_URL}/tour-3-3.jpg`,
		],
	},
	'5c88fa8cf4afda39709c2958': {
		// 城市观光
		cover: `${BASE_IMAGE_URL}/tour-4-cover.jpg`,
		images: [
			`${BASE_IMAGE_URL}/tour-4-1.jpg`,
			`${BASE_IMAGE_URL}/tour-4-2.jpg`,
			`${BASE_IMAGE_URL}/tour-4-3.jpg`,
		],
	},
	'5c88fa8cf4afda39709c2959': {
		// 文化探索
		cover: `${BASE_IMAGE_URL}/tour-5-cover.jpg`,
		images: [
			`${BASE_IMAGE_URL}/tour-5-1.jpg`,
			`${BASE_IMAGE_URL}/tour-5-2.jpg`,
			`${BASE_IMAGE_URL}/tour-5-3.jpg`,
		],
	},
	'5c88fa8cf4afda39709c2960': {
		// 冒险之旅
		cover: `${BASE_IMAGE_URL}/tour-6-cover.jpg`,
		images: [
			`${BASE_IMAGE_URL}/tour-6-1.jpg`,
			`${BASE_IMAGE_URL}/tour-6-2.jpg`,
			`${BASE_IMAGE_URL}/tour-6-3.jpg`,
		],
	},
	'5c88fa8cf4afda39709c2961': {
		// 自然风光
		cover: `${BASE_IMAGE_URL}/tour-7-cover.jpg`,
		images: [
			`${BASE_IMAGE_URL}/tour-7-1.jpg`,
			`${BASE_IMAGE_URL}/tour-7-2.jpg`,
			`${BASE_IMAGE_URL}/tour-7-3.jpg`,
		],
	},
	'5c88fa8cf4afda39709c2962': {
		// 历史遗迹
		cover: `${BASE_IMAGE_URL}/tour-8-cover.jpg`,
		images: [
			`${BASE_IMAGE_URL}/tour-8-1.jpg`,
			`${BASE_IMAGE_URL}/tour-8-2.jpg`,
			`${BASE_IMAGE_URL}/tour-8-3.jpg`,
		],
	},
	'5c88fa8cf4afda39709c2963': {
		// 美食之旅
		cover: `${BASE_IMAGE_URL}/tour-9-cover.jpg`,
		images: [
			`${BASE_IMAGE_URL}/tour-9-1.jpg`,
			`${BASE_IMAGE_URL}/tour-9-2.jpg`,
			`${BASE_IMAGE_URL}/tour-9-3.jpg`,
		],
	},
};

// 获取旅游图片信息
export const getTourImages = (tourId: string) => {
	return (
		tourImageMapping[tourId] || {
			cover: `${BASE_IMAGE_URL}/default-cover.jpg`,
			images: [],
		}
	);
};

// 获取默认图片（用于没有对应图片的旅游路线）
export const getDefaultImages = () => ({
	cover: `${BASE_IMAGE_URL}/default-cover.jpg`,
	images: [],
});
