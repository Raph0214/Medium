export const config = {
	camera: {
		scale: 5,
	},
	backgroundPlane: {
		size: {
			x: 6,
			y: 24,
		},
		resolution: 200,
		wireframe: false,
		rotation: {
			x: 70,
			y: 20,
		},
	},
	wave: {
		speed: 2.5,
		amplitude: 1,
		frequency: {
			x: 0.625,
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
				r: 204,
				g: 51,
				b: 51,
			},
			min: 0.65,
			max: 0.9,
		}
	},
};