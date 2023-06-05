# 타임코디 그룹캘린더 기능
from datetime import datetime, timedelta, date
# from weekly_groupcal import event_list 
# from sample_evt_list import sample_evt_list

weekday_map = {
    "Sunday": 0,
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6,
}
time_mapping = {
    "08:00:00": 0,
    "08:30:00": 1,
    "09:00:00": 2,
    "09:30:00": 3,
    "10:00:00": 4,
    "10:30:00": 5,
    "11:00:00": 6,
    "11:30:00": 7,
    "12:00:00": 8,
    "12:30:00": 9,
    "13:00:00": 10,
    "13:30:00": 11,
    "14:00:00": 12,
    "14:30:00": 13,
    "15:00:00": 14,
    "15:30:00": 15,
    "16:00:00": 16,
    "16:30:00": 17,
    "17:00:00": 18,
    "17:30:00": 19,
    "18:00:00": 20,
    "18:30:00": 21,
    "19:00:00": 22,
    "19:30:00": 23,
    "20:00:00": 24,
    "20:30:00": 25,
    "21:00:00": 26,
    "21:30:00": 27,
    "22:00:00": 28,
    "22:30:00": 29,
    "23:00:00": 30,
    "23:30:00": 31,
    "00:00:00": 32,
    "00:30:00": 33,
    "01:00:00": 34,
    "01:30:00": 35,
    "02:00:00": 36,
}

# 그룹캘린더 일정을 30분 단위로 쪼개기
def date_to_halfhour(evt_list):
    output = []
    for evt in evt_list:
        sdatetime = datetime.strptime(evt["sdatetime"], "%Y-%m-%dT%H:%M:%S")
        edatetime = datetime.strptime(evt["edatetime"], "%Y-%m-%dT%H:%M:%S")
        rounded_start_time = sdatetime.replace(
            minute=(sdatetime.minute // 30) * 30, second=0, microsecond=0
        )
        time_interval = timedelta(minutes=30)
        current_time = rounded_start_time
        while current_time <= edatetime:
            output.append(
                (current_time.strftime("%A"), current_time.strftime("%H:%M:%S"))
            )
            current_time += time_interval
    return output

# table mapping
def data_to_table(output, members):    
    table = [[members for _ in range(7)] for _ in range(37)]  # 7 weekdays, 38 times
    for data in output:
        weekday = weekday_map[data[0]]
        try:
            time = time_mapping[data[1]]
        except KeyError:
            # time_mapping에 시간이 없을 경우, 무시하고 다음 반복으로 넘어갑니다.
            continue
        try:
            table[time][weekday] -= 1
        except IndexError:
            print("IndexError: ", data, time, weekday)
    return table

# print(data_to_table(date_to_halfhour(event_list), 5))

# for sending to frontend
def table_for_frontend(table):
    time_mapping_2 = {v: k for k, v in time_mapping.items()}
    weekday_map_2 = {v: k for k, v in weekday_map.items()}
    output_dict = {}
    for i in range(len(table)):
        for j in range(len(table[0])):
            time_str = time_mapping_2[i]
            weekday_str = weekday_map_2[j]
            if weekday_str not in output_dict:
                output_dict[weekday_str] = {}
            output_dict[weekday_str][time_str] = table[i][j]

    return output_dict

# print(table_for_frontend(data_to_table(date_to_halfhour(event_list), 5)))

# main
def calender_to_timetable(event_list, members):
    result = []
    result.append(table_for_frontend(data_to_table(date_to_halfhour(event_list), members)))
    return result
# print(calender_to_timetable(event_list, 5))

# for test
def print_available_table(available_table):
    days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    hours = ["{:02d}:{:02d}".format(h, m) for h in range(8, 27) for m in [0, 30]]

    print(" " * 6, end="")
    for day in days:
        print("{:>8}".format(day), end="")
    print()

    for i, hour in enumerate(hours):
        print("{:<6}".format(hour), end="")
        for j in range(7):
            print("{:>8}".format(available_table[i][j]), end="")
        print()

"""
print_available_table(data_to_table(date_to_halfhour(event_list), 5))
           Sun     Mon     Tue     Wed     Thu     Fri     Sat
08:00        5       5       5       5       5       5       5
08:30        5       5       5       5       5       5       5
09:00        5       5       5       4       5       5       5
09:30        5       5       5       4       5       5       5
10:00        5       5       5       4       5       5       5
10:30        5       5       5       4       5       5       5
11:00        5       5       5       4       5       5       5
11:30        5       5       5       4       5       5       5
12:00        5       3       4       4       5       5       5
12:30        5       3       4       4       5       5       5
13:00        5       3       4       4       5       5       5
13:30        5       3       4       5       5       5       5
14:00        5       3       4       5       5       5       5
14:30        5       3       4       5       5       5       5
15:00        5       4       3       5       5       4       5
15:30        5       4       3       5       5       4       5
16:00        5       4       3       5       5       4       5
16:30        5       4       4       5       4       4       5
17:00        5       4       4       5       4       4       5
17:30        5       4       4       5       4       4       5
18:00        5       4       4       5       5       4       5
18:30        5       5       5       5       5       4       5
19:00        5       5       5       5       5       4       5
19:30        5       5       5       5       5       4       5
20:00        5       5       5       5       5       4       5
20:30        5       5       5       5       5       4       5
21:00        5       5       5       5       5       4       5
21:30        5       5       5       5       5       4       5
22:00        5       5       5       5       5       4       5
22:30        5       5       5       5       5       4       5
23:00        5       5       5       5       5       4       5
23:30        5       5       5       5       5       5       5
24:00        5       5       5       5       5       5       5
24:30        5       5       5       5       5       5       5
25:00        5       5       5       5       5       5       5
25:30        5       5       5       5       5       5       5
26:00        5       5       5       5       5       5       5
26:30        5       5       5       5       5       5       5
"""

