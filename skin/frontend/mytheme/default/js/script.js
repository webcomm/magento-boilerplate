jQuery(document).ready(function($) {
	
	// Check placeholder browser support
	if ( ! Modernizr.input.placeholder)
	{
	
		// Set placeholder values
		$(this).find('[placeholder]').each(function()
		{
			// Ff field is empty
			if ($(this).val() == '')
			{
				$(this).val( $(this).attr('placeholder') );
			}
		});

		// Focus and blur of placeholders
		$('[placeholder]').focus(function()
		{
			if ($(this).val() == $(this).attr('placeholder'))
			{
				$(this).val('');
				$(this).removeClass('placeholder');
			}
		}).blur(function()
		{
			if ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))
			{
				$(this).val($(this).attr('placeholder'));
				$(this).addClass('placeholder');
			}
		});

		// Remove placeholders on submit
		$('[placeholder]').closest('form').submit(function()
		{
			$(this).find('[placeholder]').each(function()
			{
				if ($(this).val() == $(this).attr('placeholder'))
				{
					$(this).val('');
				}
			})
		});
		
	}
});