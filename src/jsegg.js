
(function($)
{
	// entire plugins is defined under the jsegg namespace
	var NAMESPACE = 'jsegg';

	var checkEggs = function(evt)
	{
		var data = $(this).data(NAMESPACE);
		var key = evt.which;

		for (var idx=data.length; idx--;)
		{
			var cur_egg = data[idx];
			
			if (key === cur_egg.seq[cur_egg.cur_idx])
			{
				// key match, progressing to target sequence

				cur_egg.cur_idx++;

				if (cur_egg.cur_idx >= cur_egg.seq.length)
				{
					// SEQUENCE MATCH!
					cur_egg.cur_idx = 0;
					cur_egg.callback.call(this, evt, cur_egg.seq.concat());
				}
			}
			else if (cur_egg.cur_idx)
			{
				cur_egg.cur_idx = 0;
			}
		}
	};

	$.fn[NAMESPACE] = function(seq, cb)
	{
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
		sequences:
		{
			  KONAMI: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65] // UP, UP, DOWN, DOWN, LEFT, RIGHT, LEFT, RIGHT, B, A
			,   SFII: [40, 82, 38, 76, 89, 66, 88, 65] // DOWN, R, UP L, Y, B, X, A
		}
	};

})( jQuery );