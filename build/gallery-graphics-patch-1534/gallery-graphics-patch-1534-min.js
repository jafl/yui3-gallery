YUI.add("gallery-graphics-patch-1534",function(e,t){e.VMLShape&&(e.VMLShape.ATTRS.stroke.setter=function(t){var n,r,i,s=this.get("stroke")||this._getDefaultStroke();if(t){t.hasOwnProperty("weight")&&(i=parseInt(t.weight,10),isNaN(i)||(t.weight=i));for(n in t)t.hasOwnProperty(n)&&(s[n]=t[n])}return s.color&&s.color.toLowerCase().indexOf("rgba")>-1&&(s.opacity=e.Color._getAlpha(s.color),s.color=e.Color.toHex(s.color)),r=s,this._strokeFlag=!0,r},e.VMLShape.ATTRS.fill.setter=function(t){var n,r,i=this.get("fill")||this._getDefaultFill();if(t){t.hasOwnProperty("color")&&(t.type="solid");for(n in t)t.hasOwnProperty(n)&&(i[n]=t[n])}return r=i,r&&r.color&&(r.color===undefined||r.color==="none"?r.color=null:r.color.toLowerCase().indexOf("rgba")>-1&&(r.opacity=e.Color._getAlpha(r.color),r.color=e.Color.toHex(r.color))),this._fillFlag=!0,r})},"gallery-2014.01.28-00-45");
