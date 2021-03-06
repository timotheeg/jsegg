//     simple keyboard sequencer to set easter eggs
//
//     https://github.com/timotheeg/jsegg
//     (c) 2013 Timothee Groleau
//     jsegg may be freely distributed under the MIT license.

(function($)
{
	// entire plugins is defined under the jsegg namespace
	var NAMESPACE = 'jsegg';

	var checkEggs = function(evt)
	{
		var eggs = $(this).data(NAMESPACE);
		var key = evt.which;

		if (!eggs) return;

		for (var idx=eggs.length; idx--;)
		{
			var current_egg = eggs[idx];

			// console.log("checking " + [key, current_egg.seq[current_egg.cur_idx]]);

			if (key === current_egg.seq[current_egg.cur_idx])
			{
				// key match, progressing to target sequence

				if (++current_egg.cur_idx >= current_egg.seq.length)
				{
					// SEQUENCE MATCH!
					current_egg.cur_idx = 0;
					current_egg.callback.call(this, evt, current_egg.seq.concat());
				}
			}
			else if (current_egg.cur_idx)
			{
				// the check on current_egg.seq[0] below is to check if the missed key match from above
				// is in fact a valid start of a new sequence
				current_egg.cur_idx = (key === current_egg.seq[0] ? 1 : 0);
			}
		}
	};

	$.fn[NAMESPACE] = function(seq, cb)
	{
		// string preparation of the sequence
		// WARNING: only alphanum supported for now!
		if (typeof seq === "string")
		{
			seq = $.map(seq.toUpperCase().split(''), function(val){ return val.charCodeAt(0); });
		}

		return this.each(function()
		{
			var egg_data = $(this).data(NAMESPACE);
			var mgr = {seq: seq, cur_idx: 0, callback: cb};

			if (!egg_data)
			{
				// initializes egg manager
				$(this)
					.data(NAMESPACE, [mgr])
					.bind('keydown.' + NAMESPACE, checkEggs);
			}
			else
			{
				// adds the new mapping to the jsegg data
				egg_data.unshift(mgr);
			}
		});
	};

	// defining popular sequences
	$[NAMESPACE] =
	{
		  KONAMI: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65] // UP, UP, DOWN, DOWN, LEFT, RIGHT, LEFT, RIGHT, B, A
		,   SFII: [40, 82, 38, 76, 89, 66, 88, 65] // DOWN, R, UP L, Y, B, X, A
	};

})( jQuery );