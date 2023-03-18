$(document).ready(function () {
	const VIEW_PROOF = Handlebars.compile($("#viewProof").html());
	$("#sidebarCollapse").on("click", function () {
		$("#sidebar").toggleClass("active");
	});

	let dataTable = null;

	renderDataTable;
	function renderDataTable() {
		dataTable = $("#dataTable").DataTable({
			serverSide: true,
			processing: true,
			ordering: false,
			language: {
				lengthMenu: "_MENU_",
				search: "",
				searchPlaceholder: "Search...",
				paginate: {
					previous: "&laquo;",
					next: "&raquo;",
				},
				zeroRecords: "No records found.",
			},
			ajax: {
				url: "TRANSACTIONS_API",
				data: getDataTableParams,
			},

			columns: [
				{ data: "nickName" },
				{ data: "mobileNumber" },
				{ data: "regDate" },
				{ data: "country" },
				{ data: "nickName" },
				{ data: "mobileNumber" },
				{ data: "regDate" },
				{ data: "country" },
			],
			dataFilter: (d) => {
				const parsedData = JSON.parse(d);
				console.log(parsedData);
				return JSON.stringify(parsedData.data);
			},

			drawCallback: function () {
				setTimeout(() => {
					$contentLoader.hide();
				}, 500);
			},
		});
	}
	$(".btn-assign").click(onClickAssignTechnician);
	$(".btn-edit-job").click(onClickEditJob);
	$(".btn-delete-job").click(onClickDeleteJob);
	$(".btn-reassign-job").click(onClickReAssignJob);
	$(".btn-approve-job").click(onClickApproveJob);

	function onClickAssignTechnician() {
		const assignTechniciansForm = renderAssignTechniciansForm();

		Swal.fire({
			title: "Assign a Technician",
			html: assignTechniciansForm,
			backdrop: true,
			focusConfirm: false,
			showCancelButton: true,
			buttonsStyling: false,
			customClass: {
				confirmButton:
					"btn btn-success btn-sm rounded-default btn-asign-technician-confirm",
				cancelButton: "btn btn-danger btn-sm rounded-default",
				htmlContainer: "w-100 px-4 m-0 my-3",
				validationMessage: "w-100 px-3",
			},
			confirmButtonText: "<i class='icon-like'></i> &nbsp; Confirm",
			cancelButtonText: "<i class='icon-action-undo'></i> &nbsp; Cancel",
			showLoaderOnConfirm: true,
			allowOutsideClick: false,
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire("Success!", result.value.successMessage, "success");
			}
		});
	}

	function onClickEditJob() {
		Swal.fire({
			title: "Are you sure?",
			text: "You have make some changes in current Job??",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Edit",
		});
	}

	function onClickDeleteJob() {
		Swal.fire({
			title: "Delete Job",
			text: "Are you sure you have to delete this job ??",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire("Deleted!", "Your Job has been deleted.", "success");
			}
		});
	}

	function onClickReAssignJob() {
		const reAssignTechniciansForm = renderReAssignTechniciansForm();

		Swal.fire({
			title: "Re Assign a Technician",
			html: reAssignTechniciansForm,
			backdrop: true,
			focusConfirm: false,
			showCancelButton: true,
			buttonsStyling: false,
			customClass: {
				confirmButton:
					"btn btn-success btn-sm rounded-default btn-asign-technician-confirm",
				cancelButton: "btn btn-danger btn-sm rounded-default",
				htmlContainer: "w-100 px-4 m-0 my-3",
				validationMessage: "w-100 px-3",
			},
			confirmButtonText: "<i class='icon-like'></i> &nbsp; Confirm",
			cancelButtonText: "<i class='icon-action-undo'></i> &nbsp; Cancel",
			showLoaderOnConfirm: true,
			allowOutsideClick: false,
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire("Success!", result.value.successMessage, "success");
			}
		});
	}

	function onClickApproveJob() {
		const viewProofFormHTML = VIEW_PROOF();
		Swal.fire({
			html: viewProofFormHTML,
			backdrop: true,
			focusConfirm: false,
			showCancelButton: true,
			showDenyButton: true,
			buttonsStyling: false,
			customClass: {
				confirmButton: "btn btn-success btn-sm rounded-default approveBtn",
				denyButton: "btn btn-warning btn-sm rounded-default denyBtn",
				cancelButton: "btn btn-danger btn-sm rounded-default cnclBtn",
				htmlContainer: "w-100 px-4 m-0 my-3",

				validationMessage: "w-100 px-3",
			},
			confirmButtonText: "<i class='icon-like'></i>Verify",
			cancelButtonText: "<i class='icon-action-undo'></i>Cancel",
			denyButtonText: "<i class='icon-action-close'></i>Reject",
			showLoaderOnConfirm: true,
			allowOutsideClick: false,
		}).then((result) => {});
	}

	function renderAssignTechniciansForm() {
		return `<form id="AssignTechnician" class="w-100">
				<label style=" margin:10px">Select a Technicain</label>
               <select
                      id="TechnicianList"
                      class="form-select form-select-sm justify-content-center"
					  style="margin:auto;width:80%;text-align:center; align-items:center"
                    >
                      <option value="micheal">Micheal</option>
					   <option value="micheal">Micheal</option>
					    <option value="micheal">Micheal</option>
                    </select>
            </form>`;
	}

	function renderReAssignTechniciansForm() {
		return `<form id="AssignTechnician" class="w-100">

				<label class="form-control mb-2" style="padding:10px 0; line-height:5px;" >Assigned Technician : Ahamed</label>
				<label style=" margin:10px">Select a Technicain</label>
               <select
                      id="TechnicianList"
                      class="form-select form-select-sm justify-content-center"
					  style="margin:auto;width:80%;text-align:center; align-items:center"
                    >
                      <option value="micheal">Micheal</option>
					   <option value="micheal">Micheal</option>
					    <option value="micheal">Micheal</option>
                    </select>
            </form>`;
	}
});
