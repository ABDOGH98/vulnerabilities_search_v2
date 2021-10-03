// app.js
const axios = require("axios");
const express = require("express");
const cors = require("cors");
const app = express();

const port = 4000;

app.listen(port, () => console.log(`The server is listening on port ${port}`));
app.use(cors());
const parseDate = (date, splitIndicator) => {
	const dates = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	let dd = parseInt(dates.indexOf(date.split(splitIndicator)[0]) + 1) + "";

	console.log(dd);
	dd.length !== 2 ? (dd = "0" + dd) : dd;

	let dm = parseInt(date.split(splitIndicator)[1]) + "";

	dm.length !== 2 ? (dm = "0" + dm) : dm;
	let dy = parseInt(date.split(splitIndicator)[2]) + "";
	const dateVeref = dy + dm + dd;
	// console.log(dateVeref);
	return dateVeref;
};

app.get("/:dateDebut&:dateFin", async (req, res) => {
	try {
		var response = await axios.get("https://www.vmware.com/api/vmsa.html");

		const data = await response.data.advisories.filter((advisorie) => {
			if (advisorie.creationdate) {
				const date = parseDate(advisorie.creationdate, " ");

				if (
					parseInt(date) >= parseInt(req.params.dateDebut) &&
					parseInt(date) <= parseInt(req.params.dateFin)
				) {
					return {
						description: advisorie.description,
						severity: advisorie.severity,
						date: advisorie.creationdate,
					};
				} else return "";
			}
		});
		res.json(data);
	} catch (error) {
		console.log(error);
	}
});

// app.get("/redhat/:dateDebut&:dateFin", async (req, res) => {
// 	try {
// 		var response = await axios.get(
// 			"https://access.redhat.com/labs/securitydataapi/cvrf.json",
// 		);

// 		// res.send(response.data[0]);

// 		const data = await response.data.filter((advisorie) => {
// 			if (advisorie.released_on) {
// 				const date = parseDate(advisorie.released_on, "-");
// 				console.log(date);
// 				if (
// 					parseInt(date) >= parseInt(req.params.dateDebut) &&
// 					parseInt(date) <= parseInt(req.params.dateFin)
// 				) {
// 					return {
// 						description: advisorie.RHSA,
// 						severity: advisorie.severity,
// 						date: advisorie.released_on,
// 					};
// 				} else return "";
// 			}
// 		});
// 		res.send(data);
// 	} catch (error) {
// 		console.log(error);
// 	}
// });

module.exports = app;
