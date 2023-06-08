# 타임코디 그룹캘린더 기능
from datetime import datetime, timedelta


# 주석처리 안하면 백엔드 서버 실행이 안되는 테스트 주석들
# from weekly_groupcal import event_list 
# # return calender_to_timetable(event_list, db_num_member, start_date)
# start_date = "2023-04-30"
# start_date = datetime.strptime(start_date, "%Y-%m-%d")

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
def map_halfhour_to_table(output, members):
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
# print(map_halfhour_to_table(date_to_halfhour(event_list), 5))

# pick top 3 
# 실질적인 메인함수(?). return value: dictionary.  {key: weekday, value: list of top 3 times}
def pick_top3(table, start_date):
    
    time_mapping_2 = {v: k for k, v in time_mapping.items()}
    weekday_map_2 = {v: k for k, v in weekday_map.items()}
    data_dict = {}
    for i in range(len(table)):
        for j in range(len(table[0])):
            time_str = time_mapping_2[i]
            weekday_str = weekday_map_2[j]
            if weekday_str not in data_dict:
                data_dict[weekday_str] = {}
            data_dict[weekday_str][time_str] = table[i][j]

    first_list, second_list, third_list = [], [], []
    number_of_members = [0, 0, 0]  # 0: first, 1: second, 2: third members count list

    for day, times in data_dict.items():
        date = start_date + timedelta(days=weekday_map[day])
        date = date.strftime("%Y-%m-%d")
        for time, count in times.items():
            if count == 0:
                continue
            elif count > number_of_members[0]:
                number_of_members[2] = number_of_members[1]
                third_list = list(second_list)
                number_of_members[1] = number_of_members[0]
                second_list = list(first_list)
                number_of_members[0] = count
                first_list = [(date, day, time)]
            elif count == number_of_members[0]:
                first_list.append((date, day, time))
            elif count > number_of_members[1]:
                number_of_members[2] = number_of_members[1]
                third_list = list(second_list)
                number_of_members[1] = count
                second_list = [(date, day, time)]
            elif count == number_of_members[1]:
                second_list.append((date, day, time))
            elif count > number_of_members[2]:
                number_of_members[2] = count
                third_list = [(date, day, time)]
            elif count == number_of_members[2]:
                third_list.append((date, day, time))

    # frist_list, second_list, third_list : list to tuple
    first_list = tuple(first_list)
    second_list = tuple(second_list)
    third_list = tuple(third_list)

    result = {
        "first_list": {number_of_members[0]: first_list},
        "second_list": {number_of_members[1]: second_list},
        "third_list": {number_of_members[2]: third_list},
    }

    return result

# print(pick_top3(map_halfhour_to_table(date_to_halfhour(event_list), 5), start_date))

# main : for sending to frontend. 
def calender_to_timetable(event_list, members, start_date):
    result = []
    result.append(pick_top3(map_halfhour_to_table(date_to_halfhour(event_list), members), start_date))
    return result
# print(calender_to_timetable(event_list, 5, start_date))




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

