export const config = {
	camera: {
		scale: 5,
	},
	background: {
		size: {
			x: 6,
			y: 15,
		},
		resolution: 20,
		wireframe: false,
		rotation: {
			x: 60,
			y: 20,
		},
	},
	wave: {
		speed: 2.5,
		amplitude: 1.5,
		frequency: {
			x: 0.5,
			y: 1,
		},
	},
	color: {
		frequency: {
			x: 0.2,
			y: 0.5,
		},
		primary: {
			color: {
				r: 224,
				g: 82,
				b: 82,
			},
			min: 0.7,
			max: 0.8,
		},
		secondary: {
			color: {
				r: 76,
				g: 93,
				b: 179,
			},
			min: 0.7,
			max: 0.8,
			responsive: {
				speed: 0.4,
				amount: 0.0875,
			}
		},
	},
	grain: {
		color: {
			r: 191,
			g: 191,
			b: 191,
		},
		amount: 0.1,
		exponent: 20,
	}
};