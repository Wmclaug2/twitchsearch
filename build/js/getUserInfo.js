const getUserData = (userFieldVal) => {
	//temp val for testing
	// const userFieldVal = 'freecodecamp';
	const channelURL = `https://api.twitch.tv/kraken/search/channels?query=${userFieldVal}`;
	$.ajax({
		type:'GET',
		url: channelURL,
		headers:{
			'Client-ID':'djtgg4l3mmns4rfsmtdgqsd7x0xyaj'
		}, 
		success: (data) => {
			return data;
		},
		error: (err) => {
			console.log(err);
		}
	}).then((data) => {
		let strippedChannels = stripDataFromChannel(data.channels)
		createLiItems(strippedChannels);
	})
}
const stripDataFromChannel = (channelsArray) => {
	const strippedChannels= [];
	for (let channel of channelsArray){
		let channelObject = {
			name: channel.display_name,
			status: channel.status,
			url: channel.url,
			logo: channel.logo
		}
		strippedChannels.push(channelObject);
	}
	return strippedChannels;
}
const createLiItems = (channelArray) => {
	let liItems = [];
	for (let channel of channelArray){
		let img = '';
		let status = '';
		if (channel.logo != null){
			img = `<img src='${channel.logo}' alt='${channel.display_name}'s logo' class='user-logo'>`
		} else {
			img = `<img src='img/Combo_Black_RGB.png' alt='${channel.display_name}'s logo' class='user-logo empty-logo'>`
		}
		if (channel.status.length > 0){
			status = '<br><div class="status"><h3>Status</h3><p>'+ channel.status +'</p></div>';
		}
		let link = `<a href='${channel.url}'>`
		let text = `${channel.name}`
		let liItem = `<li class='result-item'>${link}${img}${text}</a> ${status}</li>`;
		liItems.push(liItem);
	}
	renderList(liItems);
}
const clearResults = () => {
	$('#results').empty();
}
const renderList = (listItems) => {
	if ($( "h4" ).text()==''){
		clearResults();
	} else {
		clearResults();
		listItems.forEach((listItem) => {
			$('#results').append(listItem)
		})
	}
}
$(document).ready(function(){
	let charDelay = 3;
	const resultDiv = $('#results');
	const button = $('#button');
	$( "input" ).keyup(function () {
			let val = $( this ).val();
			let delayed = val.length < charDelay; 
			if (!delayed){ 
				getUserData(val);
				$( "h4" ).text( `Results for ${val}`);
			} else {
				$( "h4" ).text('');
				$('#results').empty();
			}
		})
  .keyup();
});

