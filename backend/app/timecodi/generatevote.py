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

def valid_time(group_cal, listname, time_count):
    result=[]
    num_member = list(group_cal[listname].keys())[0]
    list_time = group_cal[listname][num_member]
    if len(list_time)==0:
        return False
    day = list_time[0][1]
    for i in range(len(list_time)-time_count):
        # 요일이 같지 않으면
        if day != list_time[i][1]:
            day = list_time[i][1]
            continue
        time = list_time[i][2]
        start = time_mapping[time]
        for j in range(1, time_count+1):
            next_day = list_time[i+j][1]
            next_time = time_mapping[list_time[i+j][2]]
            if next_time != start+1 or day != next_day:
                break
            start+=1
            if j == time_count:
                result.append([list_time[i][0], list_time[i][2], list_time[i+time_count][2]])
    return result
            

def create_vote(group_cal, meetingtime):
    hour = int(meetingtime[:meetingtime.index(':')])
    minute = int(meetingtime[meetingtime.index(':')+1:])
    # print(hour,minute)
    time_count = hour*2 + (minute//30)
    # print(time_count)
    
    if valid_time(group_cal, 'first_list',time_count)!=[]  and valid_time(group_cal, 'first_list',time_count) != False:
        return valid_time(group_cal, 'first_list',time_count)
    elif valid_time(group_cal, 'second_list',time_count)!=[]  and valid_time(group_cal, 'second_list',time_count) != False:
        return valid_time(group_cal, 'second_list',time_count)
    elif valid_time(group_cal, 'third_list',time_count)!=[]  and valid_time(group_cal, 'third_list',time_count) != False:
        return valid_time(group_cal, 'third_list',time_count)
    else:
        return {"msg": "available vote timezone doesn't exist."}
    

# 테스트용

# testdata=[{'first_list': {4: (('Sunday', '08:00:00'), ('Sunday', '08:30:00'), ('Sunday', '09:00:00'), ('Sunday', '09:30:00'), ('Sunday', '10:00:00'), ('Sunday', '10:30:00'), ('Sunday', '11:00:00'), ('Sunday', '11:30:00'), ('Sunday', '12:00:00'), ('Sunday', '12:30:00'), ('Sunday', '13:00:00'), ('Sunday', '13:30:00'), ('Sunday', '14:00:00'), ('Sunday', '14:30:00'), ('Sunday', '15:00:00'), ('Sunday', '15:30:00'), ('Sunday', '16:00:00'), ('Sunday', '16:30:00'), ('Sunday', '17:00:00'), ('Sunday', '17:30:00'), ('Sunday', '18:00:00'), ('Sunday', '18:30:00'), ('Sunday', '19:00:00'), ('Sunday', '19:30:00'), ('Sunday', '20:00:00'), ('Sunday', '20:30:00'), ('Sunday', '21:00:00'), ('Sunday', '21:30:00'), ('Sunday', '22:00:00'), ('Sunday', '22:30:00'), ('Sunday', '23:00:00'), ('Sunday', '23:30:00'), ('Sunday', '00:00:00'), ('Sunday', '00:30:00'), ('Sunday', '01:00:00'), ('Sunday', '01:30:00'), ('Sunday', '02:00:00'), ('Monday', '08:00:00'), ('Monday', '08:30:00'), ('Monday', '09:00:00'), ('Monday', '09:30:00'), ('Monday', '10:00:00'), ('Monday', '10:30:00'), ('Monday', '11:00:00'), ('Monday', '11:30:00'), ('Monday', '12:00:00'), ('Monday', '12:30:00'), ('Monday', '13:00:00'), ('Monday', '13:30:00'), ('Monday', '14:00:00'), ('Monday', '14:30:00'), ('Monday', '15:00:00'), ('Monday', '15:30:00'), ('Monday', '16:00:00'), ('Monday', '16:30:00'), ('Monday', '17:00:00'), ('Monday', '17:30:00'), ('Monday', '18:00:00'), ('Monday', '18:30:00'), ('Monday', '19:00:00'), ('Monday', '19:30:00'), ('Monday', '20:00:00'), ('Monday', '20:30:00'), ('Monday', '21:00:00'), ('Monday', '21:30:00'), ('Monday', '22:00:00'), ('Monday', '22:30:00'), ('Monday', '23:00:00'), ('Monday', '23:30:00'), ('Monday', '00:00:00'), ('Monday', '00:30:00'), ('Monday', '01:00:00'), ('Monday', '01:30:00'), ('Monday', '02:00:00'), ('Tuesday', '08:00:00'), ('Tuesday', '08:30:00'), ('Tuesday', '09:00:00'), ('Tuesday', '09:30:00'), ('Tuesday', '10:00:00'), ('Tuesday', '10:30:00'), ('Tuesday', '11:00:00'), ('Tuesday', '11:30:00'), ('Tuesday', '12:00:00'), ('Tuesday', '12:30:00'), ('Tuesday', '13:00:00'), ('Tuesday', '13:30:00'), ('Tuesday', '14:00:00'), ('Tuesday', '14:30:00'), ('Tuesday', '15:00:00'), ('Tuesday', '15:30:00'), ('Tuesday', '16:00:00'), ('Tuesday', '16:30:00'), ('Tuesday', '17:00:00'), ('Tuesday', '17:30:00'), ('Tuesday', '18:00:00'), ('Tuesday', '18:30:00'), ('Tuesday', '19:00:00'), ('Tuesday', '19:30:00'), ('Tuesday', '20:00:00'), ('Tuesday', '20:30:00'), ('Tuesday', '21:00:00'), ('Tuesday', '21:30:00'), ('Tuesday', '22:00:00'), ('Tuesday', '22:30:00'), ('Tuesday', '23:00:00'), ('Tuesday', '23:30:00'), ('Tuesday', '00:00:00'), ('Tuesday', '00:30:00'), ('Tuesday', '01:00:00'), ('Tuesday', '01:30:00'), ('Tuesday', '02:00:00'), ('Wednesday', '08:00:00'), ('Wednesday', '08:30:00'), ('Wednesday', '09:00:00'), ('Wednesday', '09:30:00'), ('Wednesday', '10:00:00'), ('Wednesday', '10:30:00'), ('Wednesday', '11:00:00'), ('Wednesday', '11:30:00'), ('Wednesday', '12:00:00'), ('Wednesday', '12:30:00'), ('Wednesday', '13:00:00'), ('Wednesday', '13:30:00'), ('Wednesday', '14:00:00'), ('Wednesday', '14:30:00'), ('Wednesday', '15:00:00'), ('Wednesday', '15:30:00'), ('Wednesday', '16:00:00'), ('Wednesday', '16:30:00'), ('Wednesday', '17:00:00'), ('Wednesday', '17:30:00'), ('Wednesday', '18:00:00'), ('Wednesday', '18:30:00'), ('Wednesday', '19:00:00'), ('Wednesday', '19:30:00'), ('Wednesday', '20:00:00'), ('Wednesday', '20:30:00'), ('Wednesday', '21:00:00'), ('Wednesday', '21:30:00'), ('Wednesday', '22:00:00'), ('Wednesday', '22:30:00'), ('Wednesday', '23:00:00'), ('Wednesday', '23:30:00'), ('Wednesday', '00:00:00'), ('Wednesday', '00:30:00'), ('Wednesday', '01:00:00'), ('Wednesday', '01:30:00'), ('Wednesday', '02:00:00'), ('Thursday', '08:00:00'), ('Thursday', '08:30:00'), ('Thursday', '09:00:00'), ('Thursday', '09:30:00'), ('Thursday', '10:00:00'), ('Thursday', '10:30:00'), ('Thursday', '11:00:00'), ('Thursday', '11:30:00'), ('Thursday', '12:00:00'), ('Thursday', '12:30:00'), ('Thursday', '13:00:00'), ('Thursday', '13:30:00'), ('Thursday', '14:00:00'), ('Thursday', '14:30:00'), ('Thursday', '15:00:00'), ('Thursday', '15:30:00'), ('Thursday', '16:00:00'), ('Thursday', '16:30:00'), ('Thursday', '17:00:00'), ('Thursday', '17:30:00'), ('Thursday', '18:00:00'), ('Thursday', '18:30:00'), ('Thursday', '19:00:00'), ('Thursday', '19:30:00'), ('Thursday', '20:00:00'), ('Thursday', '20:30:00'), ('Thursday', '21:00:00'), ('Thursday', '21:30:00'), ('Thursday', '22:00:00'), ('Thursday', '22:30:00'), ('Thursday', '23:00:00'), ('Thursday', '23:30:00'), ('Thursday', '00:00:00'), ('Thursday', '00:30:00'), ('Thursday', '01:00:00'), ('Thursday', '01:30:00'), ('Thursday', '02:00:00'), ('Friday', '08:00:00'), ('Friday', '08:30:00'), ('Friday', '09:00:00'), ('Friday', '09:30:00'), ('Friday', '10:00:00'), ('Friday', '10:30:00'), ('Friday', '11:00:00'), ('Friday', '11:30:00'), ('Friday', '12:00:00'), ('Friday', '12:30:00'), ('Friday', '13:00:00'), ('Friday', '13:30:00'), ('Friday', '14:00:00'), ('Friday', '14:30:00'), ('Friday', '15:00:00'), ('Friday', '15:30:00'), ('Friday', '16:00:00'), ('Friday', '16:30:00'), ('Friday', '17:00:00'), ('Friday', '17:30:00'), ('Friday', '18:00:00'), ('Friday', '18:30:00'), ('Friday', '19:00:00'), ('Friday', '19:30:00'), ('Friday', '20:00:00'), ('Friday', '20:30:00'), ('Friday', '21:00:00'), ('Friday', '21:30:00'), ('Friday', '22:00:00'), ('Friday', '22:30:00'), ('Friday', '23:00:00'), ('Friday', '23:30:00'), ('Friday', '00:00:00'), ('Friday', '00:30:00'), ('Friday', '01:00:00'), ('Friday', '01:30:00'), ('Friday', '02:00:00'), ('Saturday', '08:00:00'), ('Saturday', '08:30:00'), ('Saturday', '09:00:00'), ('Saturday', '09:30:00'), ('Saturday', '10:00:00'), ('Saturday', '10:30:00'), ('Saturday', '11:00:00'), ('Saturday', '11:30:00'), ('Saturday', '12:00:00'), ('Saturday', '12:30:00'), ('Saturday', '13:00:00'), ('Saturday', '13:30:00'), ('Saturday', '14:00:00'), ('Saturday', '14:30:00'), ('Saturday', '15:00:00'), ('Saturday', '15:30:00'), ('Saturday', '16:00:00'), ('Saturday', '16:30:00'), ('Saturday', '17:00:00'), ('Saturday', '17:30:00'), ('Saturday', '18:00:00'), ('Saturday', '18:30:00'), ('Saturday', '19:00:00'), ('Saturday', '19:30:00'), ('Saturday', '20:00:00'), ('Saturday', '22:00:00'), ('Saturday', '00:00:00'), ('Saturday', '00:30:00'), ('Saturday', '01:00:00'), ('Saturday', '01:30:00'), ('Saturday', '02:00:00'))}, 'second_list': {3: (('Saturday', '20:30:00'), ('Saturday', '21:00:00'), ('Saturday', '21:30:00'), ('Saturday', '22:30:00'), ('Saturday', '23:00:00'), ('Saturday', '23:30:00'))}, 'third_list': {0: ()}}]
# meetingtime="23:00"
# def create_vote(testdata, meetingtime):
#     hour = int(meetingtime[:meetingtime.index(':')])
#     minute = int(meetingtime[meetingtime.index(':')+1:])
#     # print(hour,minute)
#     time_count = hour*2 + (minute//30)
#     # print(time_count)
    
#     if valid_time(testdata, 'first_list',time_count)!=[] and valid_time(testdata, 'first_list',time_count)!=False:
#         print(valid_time(testdata, 'first_list',time_count))
#     elif valid_time(testdata, 'second_list',time_count)!=[] and valid_time(testdata, 'second_list',time_count)!=False:
#         print(valid_time(testdata, 'second_list',time_count))
#     elif valid_time(testdata, 'third_list',time_count)!=[] and valid_time(testdata, 'third_list',time_count)!=False:
#         print(valid_time(testdata, 'third_list',time_count))
#     else:
#         return {"msg": "available vote timezone doesn't exist."}
    
# create_vote(testdata[0], meetingtime)
