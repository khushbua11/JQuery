$(document).ready(function(){
	var obj = JSON.parse(localStorage.getItem('local_store'));
	$(obj).each(function(h_key,h_value){
		$("main").append('<section><h1> '+h_value.title+' <button class="button1" onclick=head_function(this)>X</button></h1></section>');
		h_key=h_key+1;
		$(h_value.sub).each(function(s_key,s_value){
			$("main section:nth-child("+h_key+")").append('<div><h2> '+h_value.sub[s_key].sub+' <button class="button1" onclick=subhead_function(this)>X</button></h2></div>');
			s_key=s_key+1;
			$(s_value.forms).each(function(i_key,i_value){
				var input_hold = s_value.forms[i_key].inp_data;
				var id_hold = s_value.forms[i_key].id_data;
				var name_hold = s_value.forms[i_key].name_data;
				var value_hold = s_value.forms[i_key].value_data;
				var label_hold = s_value.forms[i_key].label_data;
				var class_hold = s_value.forms[i_key].class_data;
				var option_hold = s_value.forms[i_key].option_data;
				var value_hold = s_value.forms[i_key].value_data;
				var place_hold = s_value.forms[i_key].place_data;
				var options = option_hold.split(",");
				if((input_hold == "button")||(input_hold == "text")||(input_hold == "number")||(input_hold == "email")||(input_hold == "file"))	{
					$("main section:nth-child("+h_key+") div:nth-child("+(s_key+1)+")").append('<p><input type="'+input_hold+'" name="'+name_hold+'" value="'+value_hold+'" class="'+class_hold+'" placeholder="'+place_hold+'"><button class="button1" onclick=input_function(this)>X</button></p>');
				}
				else if((input_hold == "radio")||(input_hold == "checkbox")){
					var p_tag = $('<p><button class="button1" onclick=input_function(this)>X</button></p>');
					$(options).each(function(index,value){
						index=index+1;
						input_tag=$('<input type="'+input_hold+'" name="'+name_hold+'" value="'+value_hold+'" class="'+class_hold+'"><label>'+value+'</label>');
						$(input_tag).appendTo(p_tag);
					});
					$("main section:nth-child("+h_key+") div:nth-child("+(s_key+1)+")").append(p_tag);
				}
				else if(input_hold =="textarea"){	
					$("main section:nth-child("+h_key+") div:nth-child("+(s_key+1)+")").append('<p><textarea name="'+name_hold+'" class="'+class_hold+'"></textarea><button class="button1" onclick=input_function(this)>X</button></p>');		
				}
				else if(input_hold =="select"){
					var p_tag = $('<p><button class="button1" onclick=input_function(this)>X</button></p>');
					var select_tag = $('<select name="'+name_hold+'" class="'+class_hold+'"><option>Select</option></select>').appendTo(p_tag);
					$(options).each(function(index,value){
						index=index+1;
						$('<option>'+value+'</option>').appendTo(select_tag);
					});
					$("main section:nth-child("+h_key+") div:nth-child("+(s_key+1)+")").append(p_tag);					
				}
			});
		});
	});
	$(".headingForm").submit(function(event){
		event.preventDefault();	// To enable enter key for submitting the form
		var val = $(".inputhead").val();		 
		$("main").append('<section><h1> '+ val +' <button class="button1" onclick=head_function(this)>X</button></h1></section>');
		$(".selectheading option").remove();
		$(".selectheading").append('<option value="select">Select---</option>');
		$(".selectheading1 option").remove();
		$(".selectheading1").append('<option value="select">Select---</option>');
		$("main section h1").each(function(index){
			index=index+1;
			var head=$(this).text().replace("X", "")
			$(".selectheading").append('<option value="'+ index +'">' + head + '</option>'); //append heading in subheading form
			$(".selectheading1").append('<option value="'+ index +'">' + head + '</option>'); //append heading in input form
		});	
		localstore_function();
		document.headingForm.reset(); // To reset form
  	});
	$(".subheadingForm").submit(function(event){
		event.preventDefault(); 
		var headval = $(".selectheading").val();
		var subval = $(".inputsubhead").val();
		$("main section:nth-child("+headval+")").append('<div><h2> '+ subval +' <button class="button1" onclick=subhead_function(this)>X</button></h2></div>');
		localstore_function();
		document.subheadingForm.reset();
	});
	$(".selectheading1").change(function(){
		var headval = $(".selectheading1").val();
		$(".selectsubheading option").remove();
		$(".selectsubheading").append('<option value="select">Select---</option>');
		$("main section:nth-child("+headval+") h2").each(function(index){
			index=index+1;
			var subhead=$(this).text().replace("X", "");
			$(".selectsubheading").append('<option value="'+ index +'"> '+subhead+' </option>');	//append subheading in input form
		});
	});
	$(".Form").submit(function(event){
		event.preventDefault();
		var head= $(".selectheading1").val();
		var subhead = $(".selectsubheading").val();
		subhead++;
		var idval = $(".idClass").val();
		var nameval = $(".nameClass").val();
		var valueval = $(".valueClass").val();
		var labelval = $(".labelClass").val();
		var classval = $(".classClass").val();
		var placeval = $(".placeClass").val();
		var optionval = $(".textClass").val();
		var options = optionval.split(","); //split multiple options for select,checkbox,radio type input
		if(($(".selectinputtype").val()=="radio") || ($(".selectinputtype").val() =="checkbox")){
			var p_tag = $('<p d_holder="'+$(".selectinputtype").val()+'" label_holder="'+labelval+'" id_holder="'+idval+'" name_holder="'+nameval+'" value_holder="'+valueval+'" class_holder="'+classval+'" place_holder="'+placeval+'" option_holder="'+optionval+'"><button class="button1" onclick=input_function(this)>X</button></p>');
			$(options).each(function(index,value){
				index=index+1;
				input_tag = $('<input type="'+$(".selectinputtype").val()+'" name="'+nameval+'" value="'+valueval+'" class="'+classval+'"><label>'+value+'</label>');
				$(input_tag).appendTo(p_tag);
			});
			$("main section:nth-child("+head+") div:nth-child("+subhead+")").append(p_tag);
		}
		else if($(".selectinputtype").val() =="textarea"){	
			$("main section:nth-child("+head+") div:nth-child("+subhead+")").append('<p d_holder="'+$(".selectinputtype").val()+'" label_holder="'+labelval+'" id_holder="'+idval+'" name_holder="'+nameval+'" value_holder="'+valueval+'" class_holder="'+classval+'" place_holder="'+placeval+'" option_holder="'
				+optionval+'"><textarea name="'+nameval+'" value="'+valueval+'" class="'+classval+'" placeholder="'+placeval+'"></textarea><button class="button1" onclick=input_function(this)>X</button></p>');		
		}
		else if($(".selectinputtype").val() =="select"){
			var p_tag = $('<p d_holder="'+$(".selectinputtype").val()+'" label_holder="'+labelval+'" id_holder="'+idval+'" name_holder="'
				+nameval+'" value_holder="'+valueval+'" class_holder="'+classval+'" place_holder="'+placeval+'" option_holder="'+optionval
				+'"><button class="button1" onclick=input_function(this)>X</button></p>');
			var select_tag = $('<select name="'+nameval+'" class="'+classval+'"><option>Select</option></select>').appendTo(p_tag);
			$(options).each(function(index,value){
				index=index+1;
				$('<option>'+value+'</option>').appendTo(select_tag);
			});
			$("main section:nth-child("+head+") div:nth-child("+subhead+")").append(p_tag);					
		}
		else if(($(".selectinputtype").val() =="button") || ($(".selectinputtype").val() =="text") 
			|| ($(".selectinputtype").val() =="number") || ($(".selectinputtype").val() =="email") 
			|| ($(".selectinputtype").val() =="file")){
			$("main section:nth-child("+head+") div:nth-child("+subhead+")").append('<p d_holder="'+$(".selectinputtype")
				.val()+'" label_holder="'+labelval+'" id_holder="'+idval+'" name_holder="'+nameval+'" value_holder="'
				+valueval+'" class_holder="'+classval+'" place_holder="'+placeval+'" option_holder="'+optionval+'"><input type="'
				+$(".selectinputtype").val()+'" id="'+idval+'" name="'+nameval+'" value="'+valueval+'" class="'+classval+'" placeholder="'
				+placeval+'"><button class="button1" onclick=input_function(this)>X</button></p>');
		}		
		if ($(".readonly").is(':checked')){
			var inputtype = $(".selectinputtype").val();
			if((inputtype == "button")||(inputtype == "checkbox")||(inputtype == "radio")||(inputtype == "text")||(inputtype == "email")||(inputtype == "number")||(inputtype == "file")){
				var inputtype = "input";
			}
			$("main section:nth-child("+head+") div:nth-child("+subhead+") p:last-child "+ inputtype).attr('readonly',true);
		}
		if ($(".required").is(':checked')){
			var inputtype = $(".selectinputtype").val();
			if((inputtype == "button")||(inputtype == "checkbox")||(inputtype == "radio")||(inputtype == "text")||(inputtype == "email")||(inputtype == "number")||(inputtype == "file")){
				var inputtype = "input";
			}
			$("main section:nth-child("+head+") div:nth-child("+subhead+") p:last-child "+ inputtype).attr('required',true);
		}
		if ($(".disable").is(':checked')){
			var inputtype = $(".selectinputtype").val();
			if((inputtype == "button")||(inputtype == "checkbox")||(inputtype == "radio")||(inputtype == "text")||(inputtype == "email")||(inputtype == "number")||(inputtype == "file")){
				var inputtype = "input";
			}
			$("main section:nth-child("+head+") div:nth-child("+subhead+") p:last-child "+ inputtype).attr('disabled',true);
		}
		localstore_function();
		document.Form.reset();			
	});
	function localstore_function(){
		var local_store=[];
		$("main section h1").each(function(hkey,hvalue){
			hkey=hkey+1;
			var head=$(this).text().replace("X", "");
			local_store.push({'title':head,'sub':[]});
			$("main section:nth-child("+hkey+") div h2").each(function(skey,svalue){
				skey=skey+1;
				var subhead=$(this).text().replace("X", "");
				local_store[hkey-1].sub.push({'sub':subhead,'forms':[]});
				$("main section:nth-child("+hkey+") div:nth-child("+(skey+1)+") p").each(function(fkey,fvalue){
					var inp_data = $(this).attr('d_holder');
					var id_data = $(this).attr('id_holder');
					var name_data = $(this).attr('name_holder');
					var value_data = $(this).attr('value_holder');
					var label_data = $(this).attr('label_holder');
					var class_data = $(this).attr('class_holder');
					var place_data = $(this).attr('place_holder');
					var option_data = $(this).attr('option_holder');
					local_store[hkey-1].sub[skey-1].forms.push({'inp_data':inp_data,'id_data':id_data, 'name_data':name_data, 'value_data':value_data, 'label_data':label_data, 'class_data':class_data, 'place_data':place_data, 'option_data':option_data});
				});
			});
		});
		localStorage.setItem('local_store', JSON.stringify(local_store));
	}
});
function head_function(th){
	$(th).parent().parent().remove();
	$(".selectheading option").remove();
	$("main section h1").each(function(index){
		index=index+1;
		var head=$(this).text().replace("X", "");
		$(".selectheading").append('<option value="'+ index +'">' + head + '</option>');
	});
	$(".selectheading1 option").remove();
	$("main section h1").each(function(index){
		index=index+1;
		var head=$(this).text().replace("X", "");
		$(".selectheading1").append('<option value="'+ index +'">' + head + '</option>');
	});
}
function subhead_function(th){
	$(th).parent().parent().remove();
}
function input_function(th){
	$(th).parent().remove();
}