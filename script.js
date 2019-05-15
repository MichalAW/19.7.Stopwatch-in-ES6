 function pad0(value) {
	console.log(value);
	// let makes variable work in a block context
	let result = value.toString();

	if (result.length < 2) {
		result = "0" + result;
	}
	console.log(value);
	return result;
}
class StopWatchComponent extends React.Component {
	constructor(props) {
		// access this.props in constructor
		super(props);
		this.state = {
			running: false,
			minutes: 0,
			seconds: 0,
			miliseconds: 0
		};

		this.format = this.format.bind(this);
		this.start = this.start.bind(this);
		this.step = this.step.bind(this);
		this.calculate = this.calculate.bind(this);
		this.stop = this.stop.bind(this);
	}

	format(times) {
		// Returns the largest integer equal to the data.
		console.log(times);
		return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(
			Math.floor(times.miliseconds)
		)}`;
	}

	start() {
		if (!this.state.running) {
			this.state.running = true;
			// Set the delay to cyclically call.
			this.watch = setInterval(() => this.step(), 10);
		}
	}

	step() {
		if (!this.state.running) return;
		this.calculate();
	}

	calculate() {
		this.setState({
			miliseconds: this.state.miliseconds + 1
		});
		if (this.state.miliseconds >= 100) {
			this.setState({
				seconds: this.state.seconds + 1,
				miliseconds: 0
			});
		}
		if (this.state.seconds >= 60) {
			this.setState({
				seconds: this.state.seconds + 1,
				miliseconds: 0
			});
		}
	}

	stop() {
		this.setState({
			running: false
		});		
		//  removes calling the function setInterval () method.
		clearInterval(this.watch);
	}
	render() {
		return (
			<div>
				<p onClick={this.start}>Start</p>
				<p onClick={this.stop}>Stop</p>
				<p>
				{this.format({
					minutes: this.state.minutes,
					seconds: this.state.seconds,
					miliseconds: this.state.miliseconds
				})}
				</p>
			</div>
		);
	}
}

ReactDOM.render(<StopWatchComponent />, document.getElementById("stopWatchComp"));