Create Index for geo Search

db.airbnb.createIndex({ "address.location.coordinates": "2dsphere" })


if (req.query.lat && req.query.lon && req.query.distance) {
        query = {
            'publisher.location.coordinates': {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [req.query.lon, req.query.lat]
                    },
                    $maxDistance: req.query.distance
                }
            }
        }
    }
