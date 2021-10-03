import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./App.css";

function App() {
	const [data, setData] = useState([]);
	useEffect(() => {
		axios.get("/20200922&20210922").then((res) => {
			setData(res.data);
		});
	}, []);
	useEffect(() => {
		console.log(data);
	}, [data]);

	return data.length > 0 ? (
		data.map((d, index) => {
			if (d !== "") {
				return (
					<div key={index}>
						<p>{d.description}</p>
						<p>{d.severity}</p>
						<p>{d.creationdate}</p>
						<p>
							----------------------------------------------------------------------------
						</p>
					</div>
				);
			}
		})
	) : (
		<p>loading ...</p>
	);
}

export default App;
