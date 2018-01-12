(function($)
{
	$.Redactor.prototype.definedlinks = function()
	{
		return {
			init: function()
			{
				if (!this.opts.definedLinks)
				{
					return;
				}

				this.modal.addCallback('link', $.proxy(this.definedlinks.load, this));

			},
			load: function()
			{
				var $section = $('<div />');
				var $select = $('<select id="redactor-defined-links" />');

				$section.append($select);
				this.modal.getModal().prepend($section);

				this.definedlinks.storage = {};

				var url = (this.opts.definedlinks) ? this.opts.definedlinks : this.opts.definedLinks;
				$.getJSON(url, $.proxy(function(data)
				{
                    var $selected = $('#redactor-link-url').val();

					$.each(data, $.proxy(function(key, val)
					{
						this.definedlinks.storage[key] = val;

						if(val.url === $selected) {
                            $select.append($('<option selected>').val(key).html(val.name).css('padding-left', (val.depth * 10)+'px'));
                        }
                        else {
                            $select.append($('<option>').val(key).html(val.name).css('padding-left', (val.depth * 10)+'px'));
						}

					}, this));

					$select.on('change', $.proxy(this.definedlinks.select, this));

                    $('#redactor-defined-links').selectize({});

				}, this));

			},
			select: function(e)
			{
				var oldText = $.trim($('#redactor-link-url-text').val());

				var key = $(e.target).val();
				var name = '', url = '';
				if (key !== 0)
				{
					name = this.definedlinks.storage[key].name;
					url = this.definedlinks.storage[key].url;
				}

				$('#redactor-link-url').val(url);

				if (oldText === '')
				{
					$('#redactor-link-url-text').val(name);
				}

			}
		};
	};
})(jQuery);
(function($)
{
	$.Redactor.prototype.imagelinks = function()
	{
		return {
			init: function()
			{
				console.log('IMG LINKS');
				if (!this.opts.definedLinks)
				{
					return;
				}

				console.log(this.modal);

				this.modal.addCallback('imageEdit', $.proxy(this.imagelinks.load, this));

			},
			load: function()
			{
				console.log('IMG EDIT LOAD()');
				var $section = $('<div />');
				var $select = $('<select id="redactor-defined-links" />');

				$section.append($select);
				this.modal.getModal().prepend($section);

				this.imagelinks.storage = {};

				var url = (this.opts.definedLinks) ? this.opts.definedLinks : this.opts.definedLinks;
				$.getJSON(url, $.proxy(function(data)
				{
                    var $selected = $('#redactor-image-link').val();

					$.each(data, $.proxy(function(key, val)
					{
						this.imagelinks.storage[key] = val;

						if(val.url === $selected) {
                            $select.append($('<option selected>').val(key).html(val.name).css('padding-left', (val.depth * 10)+'px'));
                        }
                        else {
                            $select.append($('<option>').val(key).html(val.name).css('padding-left', (val.depth * 10)+'px'));
						}

					}, this));

					$select.on('change', $.proxy(this.imagelinks.select, this));

                    $('#redactor-defined-links').selectize({});

				}, this));

			},
			select: function(e)
			{
				var key = $(e.target).val();
				var name = '', url = '';
				if (key !== 0)
				{
					name = this.imagelinks.storage[key].name;
					url = this.imagelinks.storage[key].url;
				}

				$('#redactor-image-link').val(url);
			}
		};
	};
})(jQuery);

//# sourceMappingURL=scripts.js.map
