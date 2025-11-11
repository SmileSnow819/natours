import React from 'react';

const AppFooter: React.FC = () => {
	return (
		<div className=" flex flex-col font-sans">
			<footer className=" text-white mt-auto w-full">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					{/* Bottom Section: Copyright */}
					<div className="text-center pt-4">
						<p className="text-sm text-gray-500">
							&copy; 2025 Your Static App.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default AppFooter;
