var initVars = function() {
	var bunsIcons = {
		Kai: 'img/kai_buns.gif',
		Sarah: 'img/sarah_buns.gif',
		Unknown: 'img/unknown.png'
	};

	window.localStorage.setItem("bunsIcons", bunsIcons);
	window.localStorage.setItem("img_path", bunsIcons.Unknown);
	console.log("global variable init complete");
};


document.addEventListener('deviceready', initVars, true);
