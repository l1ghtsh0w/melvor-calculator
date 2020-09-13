var levelObj = {
   1: 0,
   2: 83,
   3: 174,
   4: 276,
   5: 388,
   6: 512,
   7: 650,
   8: 801,
   9: 969,
   10: 1154,
   11: 1358,
   12: 1584,
   13: 1833,
   14: 2107,
   15: 2411,
   16: 2746,
   17: 3115,
   18: 3523,
   19: 3973,
   20: 4470,
   21: 5018,
   22: 5624,
   23: 6291,
   24: 7028,
   25: 7842,
   26: 8740,
   27: 9730,
   28: 10824,
   29: 12031,
   30: 13363,
   31: 14833,
   32: 16456,
   33: 18247,
   34: 20224,
   35: 22406,
   36: 24815,
   37: 27473,
   38: 30408,
   39: 33648,
   40: 37224,
   41: 41171,
   42: 45529,
   43: 50339,
   44: 55649,
   45: 61512,
   46: 67983,
   47: 75127,
   48: 83014,
   49: 91721,
   50: 101333,
   51: 111945,
   52: 123660,
   53: 136594,
   54: 150872,
   55: 166636,
   56: 184040,
   57: 203254,
   58: 224466,
   59: 247886,
   60: 273742,
   61: 302288,
   62: 333804,
   63: 368599,
   64: 407015,
   65: 449428,
   66: 496254,
   67: 547953,
   68: 605032,
   69: 668051,
   70: 737627,
   71: 814445,
   72: 899257,
   73: 992895,
   74: 1096278,
   75: 1210421,
   76: 1336443,
   77: 1475581,
   78: 1629200,
   79: 1798808,
   80: 1986068,
   81: 2192818,
   82: 2421087,
   83: 2673114,
   84: 2951373,
   85: 3258594,
   86: 3597792,
   87: 3972294,
   88: 4385776,
   89: 4842295,
   90: 5346332,
   91: 5902831,
   92: 6517253,
   93: 7195629,
   94: 7944614,
   95: 8771558,
   96: 9684577,
   97: 10692629,
   98: 11805606,
   99: 13034431,
};

var exps = Object.values(levelObj);
var levs = Object.keys(levelObj);

function getNextHighestInd(value)
{
   var i = exps.length;
   while (exps[--i] > value);
   return ++i;
}

function submitForm()
{
   let fromExp = true;
   let currentLvl = document.forms["calc"]["crntLvl"].value;
   let currentXp = document.forms["calc"]["crntXp"].value;
   let desiredLvl = document.forms["calc"]["dsrdLvl"].value;
   let secsPerAct = document.forms["calc"]["secsPerAct"].value;
   let expPerAct = document.forms["calc"]["expPerAct"].value;

   if (currentXp === "")
   {
      fromExp = false;
   }

   if (fromExp) // No level, Yes exp
   {
      currentLvl = levs[getNextHighestInd(currentXp)-1];
      document.forms["calc"]["crntLvl"].value = currentLvl;
   }
   else // Yes level, No exp
   {
      let lvlInd = levs.indexOf(currentLvl);
      currentXp = exps[lvlInd];
      document.forms["calc"]["crntXp"].value = currentXp;
   }

   let desiredLvlInd = levs.indexOf(desiredLvl);
   let desiredLvlXp = exps[desiredLvlInd];
   let neededXp = desiredLvlXp - currentXp;
   let neededActs = neededXp / expPerAct;
   neededActs = Math.ceil(neededActs);
   let secondsNeeded = neededActs * secsPerAct;
   let minutesNeeded = secondsNeeded / 60;
   let hoursNeeded = minutesNeeded / 60;
   let daysNeeded = hoursNeeded / 24;
   minutesNeeded = minutesNeeded % 60;
   secondsNeeded = secondsNeeded % 60;
   hoursNeeded = hoursNeeded.toFixed(2);
   minutesNeeded = Math.ceil(minutesNeeded);
   secondsNeeded = Math.ceil(secondsNeeded);
   neededXp = neededXp.toLocaleString();
   neededActs = neededActs.toLocaleString();
   
   if (hoursNeeded > 24)
   {
      hoursNeeded = hoursNeeded % 24;
      hoursNeeded = hoursNeeded.toFixed(2);
      daysNeeded = daysNeeded.toFixed(2);
      document.getElementById("result").innerHTML = "To get from <span class='rslt'>level " + currentLvl + "</span> to <span class='rslt'>level " + desiredLvl + "</span>, you need <span class='rslt'>" + neededXp + " experience</span>, <br />requiring around <span class='rslt'>" + neededActs + " actions</span>.<br />This will take around:<br /><span class='rslt'>" + daysNeeded + " days</span><br /><span class='rslt'>" + hoursNeeded + " hours</span><br /><span class='rslt'>" + minutesNeeded + " minutes</span><br /><span class='rslt'>" + secondsNeeded + " seconds</span>";
   }
   else if (hoursNeeded == 24)
   {
      hoursNeeded = hoursNeeded.toFixed(2);
      daysNeeded = daysNeeded.toFixed(2);
      document.getElementById("result").innerHTML = "To get from <span class='rslt'>level " + currentLvl + "</span> to <span class='rslt'>level " + desiredLvl + "</span>, you need <span class='rslt'>" + neededXp + " experience</span>, <br />requiring around <span class='rslt'>" + neededActs + " actions</span>.<br />This will take around:<br /><span class='rslt'>1 day</span><br /><span class='rslt'>" + minutesNeeded + " minutes</span><br /><span class='rslt'>" + secondsNeeded + " seconds</span>";
   }
   else if (hoursNeeded >= 1)
   {
      hoursNeeded = hoursNeeded.toFixed(2);
      daysNeeded = daysNeeded.toFixed(2);
      document.getElementById("result").innerHTML = "To get from <span class='rslt'>level " + currentLvl + "</span> to <span class='rslt'>level " + desiredLvl + "</span>, you need <span class='rslt'>" + neededXp + " experience</span>, <br />requiring around <span class='rslt'>" + neededActs + " actions</span>.<br />This will take around:<br /><span class='rslt'>" + hoursNeeded + " hours</span><br /><span class='rslt'>" + minutesNeeded + " minutes</span><br /><span class='rslt'>" + secondsNeeded + " seconds</span>";
   }
   else
   {
      document.getElementById("result").innerHTML = "To get from <span class='rslt'>level " + currentLvl + "</span> to <span class='rslt'>level " + desiredLvl + "</span>, you need <span class='rslt'>" + neededXp + " experience</span>, <br />requiring around <span class='rslt'>" + neededActs + " actions</span>.<br />This will take around:<br /><span class='rslt'>" + minutesNeeded + " minutes</span><br /><span class='rslt'>" + secondsNeeded + " seconds</span>";
   }
   document.getElementById("result").style.display = "block";
}

function reset()
{
   location.reload();
   document.forms["calc"]["crntLvl"].value = "";
   document.forms["calc"]["crntXp"].value = "";
   document.forms["calc"]["dsrdLvl"].value = "";
   document.forms["calc"]["secsPerAct"].value = "";
   document.forms["calc"]["expPerAct"].value = "";
}