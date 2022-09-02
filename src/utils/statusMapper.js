export default function getEmissionStatus(cfp) {
    if (cfp > 25) {
        return "Bad"
    } else if (cfp > 15) {
        return "Average"
    } else if (cfp > 5) {
        return "Good"
    } else if (cfp > 0) {
        return "Great"
    } else {
        return ""
    }
}
