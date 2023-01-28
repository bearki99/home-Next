
export function formatChangeTime(dateTimeStamp) {//传入需要判断的时间
  var result;
  var time = dateTimeStamp;
  if(!/^[0-9]*$/.test (time)){
    time = Date.parse(time);
  }
  var nowTime = new Date().getTime();
  var timeDifference = nowTime - time;

  var minTime = 60000;
  var hourTime = minTime * 60;
  var dayTime = hourTime * 24;
  var weektTime = dayTime * 7;
  var monthTime = dayTime * 30;
  var yearTime = dayTime * 365;

  if (parseInt(timeDifference / yearTime) >= 1) {
    result = parseInt(timeDifference / yearTime) + "年前";
  } else if (parseInt(timeDifference / monthTime) >= 1) {
    result = parseInt(timeDifference / monthTime) + "月前";
  } else if (parseInt(timeDifference / weektTime) >= 1) {
    result = parseInt(timeDifference / weektTime) + "周前";
  } else if (parseInt(timeDifference / dayTime) >= 1) {
    result = parseInt(timeDifference / dayTime) + "天前";
  } else if (parseInt(timeDifference / hourTime) >= 1) {
    result = parseInt(timeDifference / hourTime) + "小时前";
  } else if (parseInt(timeDifference / minTime) >= 1) {
    result = parseInt(timeDifference / minTime) + "分钟前";
    if (parseInt(timeDifference / minTime) <= 5) {//五分钟内就是刚刚
      result = "刚刚";
    }
  }
  return result;
}