import { useState } from "react";
import Axios from "axios";
export const useHttp = ({ url, httpMethod }, applyData) => {
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState(null);

	const sendRequest = () => {
		httpMethod(url)
			.then((response) => {
				applyData(response.data);
			})
			.catch((err) => {
				setHttpError(err.response.data);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return {
		httpError,
		isLoading,
		sendRequest,
	};
};
