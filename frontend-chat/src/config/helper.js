function timeAgo(pastDate) {
    const now = new Date();
    const past = new Date(pastDate);
    const secondsAgo = Math.floor((now - past) / 1000);

    if (secondsAgo < 60) {
        return secondsAgo + " seconds ago";
    } else if (secondsAgo < 3600) {
        const minutes = Math.floor(secondsAgo / 60);
        return minutes + " minutes ago";
    } else if (secondsAgo < 86400) {
        const hours = Math.floor(secondsAgo / 3600);
        return hours + " hours ago";
    } else if (secondsAgo < 2592000) {
        const days = Math.floor(secondsAgo / 86400);
        return days + " days ago";
    } else if (secondsAgo < 31536000) {
        const months = Math.floor(secondsAgo / 2592000);
        return months + " months ago";
    } else {
        const years = Math.floor(secondsAgo / 31536000);
        return years + " years ago";
    }
}

export default timeAgo;