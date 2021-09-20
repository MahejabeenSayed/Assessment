import React from 'react';
import './user-info.scss';

const UserInfo = (props) => {
	const count = props.notifications ? props.notifications.length : false;

  return (
		<div className="UserInfo">		

			<img 
				className="UserInfo-image" 
				src={props.image}
			/>

			<strong className="UserInfo-name">
				{props.userName}
			</strong>
		</div>
  );
};

export default UserInfo;