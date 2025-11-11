import React from 'react';

interface ErrorMessageProps {
	message: string;
	onRetry?: () => void;
	showRetry?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
	message,
	onRetry,
	showRetry = true,
}) => {
	return (
		<div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
			<div className="flex flex-col items-center">
				<div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
					<svg
						className="w-6 h-6 text-red-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h3 className="text-lg font-medium text-red-800 mb-2">出错了</h3>
				<p className="text-red-700 mb-4">{message}</p>
				{showRetry && onRetry && (
					<button
						onClick={onRetry}
						className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
					>
						重试
					</button>
				)}
			</div>
		</div>
	);
};

export default ErrorMessage;
