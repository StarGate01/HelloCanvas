var lastXY = {};
(function($) {
	
	$.fn.alltouch = function(options) {
		
		this.bind("mousedown mousemove mouseup MSPointerDown MSPointerMove MSPointerUp touchstart touchmove touchend", function(jEventObject) {
			var eventObject = jEventObject.originalEvent;
			if (eventObject.preventManipulation) eventObject.preventManipulation();
			var p = {pageX: eventObject.pageX || event.targetTouches[0].pageX, pageY: eventObject.pageY || event.targetTouches[0].pageY};
			if (eventObject.type.match(/(down|start)$/i)) {
				// process mousedown, MSPointerDown, and touchstart
				options.onDown(p.pageX, p.pageY);
			}
			else if (eventObject.type.match(/move$/i)) {
				// process mousemove, MSPointerMove, and touchmove
				options.onMove(p.pageX, p.pageY);
			}
			else if (eventObject.type.match(/(up|end)$/i)) {
				// process mouseup, MSPointerUp, and touchend
				options.onUp(p.pageX, p.pageY);
			}
			jEventObject.preventDefault();
		});
		
	};
	
	})(jQuery);	