import React from 'react';
import './Cards.scss';
import CountUp from 'react-countup';

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => (
	<div className="Cards">
		<div className="Card confirmed">
			<div className="Card__header">confirmed</div>
			<CountUp start={0} end={confirmed} duration={1} className="Card__value" separator=", " />
			<div className="Card__date">{new Date(lastUpdate).toDateString()}</div>
			<div className="Card__description">Number of active cases of COVID-19.</div>
		</div>
		<div className="Card recovered">
			<div className="Card__header">recovered</div>
			<CountUp start={0} end={recovered} duration={1} className="Card__value" separator=", " />
			<div className="Card__date">{new Date(lastUpdate).toDateString()}</div>
			<div className="Card__description">Number of people recovered from COVID-19.</div>
		</div>
		<div className="Card deaths">
			<div className="Card__header">deaths</div>
			<CountUp start={0} end={deaths} duration={1} className="Card__value" separator=", " />
			<div className="Card__date">{new Date(lastUpdate).toDateString()}</div>
			<div className="Card__description">Number of people died from COVID-19.</div>
		</div>
	</div>
);

export default Cards;
