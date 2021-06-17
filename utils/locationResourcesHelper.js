export default {
    createLocationCorrectData: () => {
        return {
            location_name: 'Lagos',
            description: "Lagos Nigeria",
            website: "www.lagos.com",
            phone: "0909090900",
            location_lat: "00293937393.0389",
            location_log: "00293937393.0389",
        }
    },
    createLocationIncompletePayload: () => {
        return {
            location_name: 'Lagos',
            description: "Lagos Nigeria",
            location_lat: "00293937393.0389",
            location_log: "00293937393.0389",
        }
    },
    createLocationPhoneNumberExceed11: () => {
        return {
            phone: "0909090900222",
        }
    },
    getLocationValidId: () => {
        return {
            pk: 1
        }
    },
    getLocationInvalid: () => {
        return {
            pk: ''
        }
    },
    getLocationNOTEXISTID: () => {
        return {
            pk: '23'
        }
    },
    ValidDistancePayload: () => {
        return {
            adminlat: "6.5053156927581055",
            adminlog: "3.5815303607917435",
            locationId: "1"
        }
    },
    InValidDistancePayload: () => {
        return {
            adminlat: "6.5053156927581055",
            adminlog: "3.5815303607917435",
            locationId: "10"
        }
    }

}