const BASE_NAMES = ['Antimatter', 'Infinity', 'Eternity', 'Reality'];
const TYPES = ['' , 'Points', 'Power']

function getResourceName(type, loc) {	
	if (loc.length == 1) {
		if (loc[0] < 4) {
			if (loc[0] == 0) {
				return 'Antimatter';
			} else {
				return BASE_NAMES[loc[0]] + ' ' + TYPES[type];
			}
		} else {
			return 'Prestige ' + loc[0] + ' ' + TYPES[type];
		}
	} else if (loc.length == 2) {
		if (loc[1] == 1) {
			if (loc[0] < 4) {
				if (loc[0] == 0) {
					return 'Meta-Antimatter';
				} else {
					return 'Meta-' + BASE_NAMES[loc[0]] + ' ' + TYPES[type];
				}
			} else {
				return 'Meta-Prestige ' + loc[0] + ' ' + TYPES[type];
			}
		} else {
			if (loc[0] < 4) {
				if (loc[0] == 0) {
					return 'Meta^' + loc[1] + '-Antimatter';
				} else {
					return 'Meta^' + loc[1] + '-' + BASE_NAMES[loc[0]] + ' ' + TYPES[type];
				}
			} else {
				return 'Meta^' + loc[1] + '-Prestige ' + loc[0] + ' ' + TYPES[type];
			}
		}
	} else {
		return 'Prestige ' + JSON.stringify(loc).replace(/(^\[|\]$)/g, '') + ' ' + TYPES[type];
	}
}