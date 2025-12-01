def normalize_string(hours_str):
    """Normalize Unicode spacing and dashes to standard formats."""
    return (
        hours_str
        .replace('\u202f', ' ')   # narrow no-break space → space
        .replace('\u2013', '-')   # en dash → hyphen
        .strip()
    )

def time_to_minutes(t):  # "14:30" -> 870
    h, m = map(int, t.split(":"))
    return h * 60 + m

def parse_time_str(t):  # "1h 30m 4s" -> 94
    if not t:
        raise ValueError("Empty time string provided.")
    parts = normalize_string(t).split()
    total_minutes = 0
    for i in range(len(parts)):
        if parts[i].endswith('h'):
            total_minutes += int(parts[i][:-1]) * 60
        elif parts[i].endswith('m'):
            total_minutes += int(parts[i][:-1])
        elif parts[i].endswith('s'):
            total_minutes += int(parts[i][:-1]) // 60
    if total_minutes < 0:
        raise ValueError(f"Invalid time string: {t}")
    return total_minutes

def min_to_time_str(t):
    h = t // 60
    m = t % 60
    return f"{h:02}:{m:02}"  # "14:30"

def is_meal(t: int):
    MEAL_TIMES = [(time_to_minutes("07:00"), time_to_minutes("11:00")), (time_to_minutes("11:00"), time_to_minutes("15:00")), (time_to_minutes("17:00"), time_to_minutes("21:00"))]
    for i in range(len(MEAL_TIMES)):
        start, end = MEAL_TIMES[i]
        if start <= t < end:
            return i
    return -1
