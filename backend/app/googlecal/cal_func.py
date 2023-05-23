# 참고 사이트: https://developers.google.com/calendar/api/v3/reference/events/list?hl=ko#python
from ..googlecal.cal import get_cal
import os.path
from googleapiclient.errors import HttpError
from datetime import datetime

def get_event():
    
    list_event=[]
    service=get_cal()
    # Call the Calendar API
    try:
        now = datetime.now()
        now = str(now.date()) +'T00:00:00+09:00'
        print(now)
        

        calendar_list = service.calendarList().list().execute()
        for calendar_list_entry in calendar_list['items']:
            # print(calendar_list_entry['id'])
        # print('Getting the upcoming 100 events') 
            if calendar_list_entry['id']=='ko.south_korea#holiday@group.v.calendar.google.com':
                continue
            events_result = service.events().list(calendarId=calendar_list_entry['id'], timeMin=now,
                                                singleEvents=True,
                                                orderBy='startTime').execute()
            events = events_result.get('items', [])

            if not events:
                print('No upcoming events found.')
                continue

            for event in events:
                start = event['start'].get('dateTime', event['start'].get('date')) # 시작날짜와 시간
                end = event['end'].get('dateTime', event['end'].get('date')) # 종료날짜와 시간
                start=start[:19]
                end=end[:19]
        
                # 기본설정: default/ 전체공개:public/ 비공개:private
                try:
                    state=event['visibility']
                except KeyError:
                    state='default'

                list_event.append([start,end,event['summary'],state]) 
        CURR_DIR = os.path.dirname(os.path.realpath(__file__))
        token_file=str(CURR_DIR)+'/token.json'
        if os.path.exists(token_file):
            os.remove(token_file)
        return list_event

    except HttpError as error:
        print('An error occurred: %s' % error)
