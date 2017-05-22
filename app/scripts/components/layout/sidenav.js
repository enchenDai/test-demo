'use strict';
angular.module('DeepBlueAdminWebApp')
    .controller('com.deepblue.web.common.SideNavController',
        ['$scope', '$state', 'localStorageService',
        function ($scope, $state, localStorageService) {

            $scope.view = {
                settings: false,
                userManagement: false
            };
            $scope.checkstatus = function () {
                $scope.view.settings = !$scope.view.settings;
                $state.go('site.app.settings.navmap');
            };



            $scope.includeState = function (stateName) {
                return $state.includes(stateName);
            };
            $scope.hasAnyAuthority = function (authorities) {
                for (var i = 0; i < authorities.length; i++) {
                    if ($scope.currentUser && $scope.currentUser.authorities.indexOf(authorities[i]) !== -1) {
                        return true;
                    }
                }
                return false;
            };
            // $scope.isExpenseReportActive = function () {
            //     return $state.includes('site.app.expense_report_my')
            //         || $state.includes('site.app.expense_report_detail_view')
            //         || $state.includes('site.app.expense_report_detail_withdraw')
            //         || $state.includes('site.app.expense_report_detail_submit')
            //         || $state.includes('site.app.expense_report_base')
            //         || $state.includes('site.app.expense_report_travel_base')
            //         || $state.includes('site.app.expense_report_invoice_base')
            //         || $state.includes('site.app.expense_report_next')
            //         || $state.includes('site.app.expense_report_travel_next')
            //         || $state.includes('site.app.expense_report_invoice_next')
            //         || $state.includes('site.app.expense_report_normal')
            //         || $state.includes('site.app.expense_report_withdraw')
            //         || $state.includes('site.app.expense_report_approval_reject')
            //         || $state.includes('site.app.expense_report_audit_reject')
            //         || $state.includes('site.app.invoice_list')
            //         || $state.includes('site.app.invoice_list_select')
            //         || $state.includes('site.app.expense_create')
            //         || $state.includes('site.app.expense_edit')
            //         || $state.includes('site.app.expense_partially_edit')
            //         || $state.includes('site.app.expense_readonly')
            //         || $state.includes('site.app.borrow_money_list')
            //
            // };
            //
            // $scope.isCompanyStructureActive = function () {
            //     return $state.includes('site.app.company_employee_detail')
            //         || $state.includes('site.app.employee_detail_manage')
            //         || $state.includes('site.app.employee_create_manage')
            //         || $state.includes('site.app.company_employee_list')
            //         || $state.includes('site.app.organization_management')
            //         || $state.includes('site.app.employee_operation')
            //         || $state.includes('site.app.department_employee_list')
            //         || $state.includes('site.app.company_invoice')
            //         || $state.includes('site.app.company_invoice_detail')
            //         || $state.includes('site.app.legal_detail')
            //         || $state.includes('site.app.expand_column_design')
            //         || $state.includes('site.app.company_manage');
            // };
            // $scope.isSettingsActive = function () {
            //     return $state.includes('site.app.settings')
            //         || $state.includes('site.app.settings.agency_list')
            //         || $state.includes('site.app.settings.agency_create')
            //         || $state.includes('site.app.settings.navmap')
            //         || $state.includes('site.app.settings.categories')
            //         || $state.includes('site.app.settings.create_category')
            //         || $state.includes('site.app.settings.currency.list')
            //         || $state.includes('site.app.settings.currency.detail')
            //         || $state.includes('site.app.custom_value_detail')
            //         || $state.includes('site.app.custom_value_list')
            //         || $state.includes('site.app.settings.categories')
            //         || $state.includes('site.app.settings.create_category')
            //         || $state.includes('site.app.finance_list')
            //         || $state.includes('site.app.finance_authorization_list')
            //         || $state.includes('site.app.finance_authorization_edit')
            //         || $state.includes('site.app.budget')
            //         || $state.includes('site.app.cost_center')
            //         || $state.includes('site.app.cost_center_create')
            //         || $state.includes('site.app.cost_center_edit')
            //         || $state.includes('site.app.cost_center_item_create')
            //         || $state.includes('site.app.cost_center_item_edit')
            //         || $state.includes('site.app.travel_standard_list')
            //         || $state.includes('site.app.travel_standard_detail')
            //         || $state.includes('site.app.travel_standard_create')
            //         || $state.includes('site.app.travel_standard_update')
            //         || $state.includes('site.app.travel_standard_copy')
            //         || $state.includes('site.app.cost_center_item_edit')
            //         || $state.includes('site.app.form_design_container')
            //         || $state.includes('site.app.form_list')
            //         || $state.includes('site.app.form_design_create')
            //         || $state.includes('site.app.form_design_edit')
            //         || $state.includes('site.app.private_car_for_public_create')
            //         || $state.includes('site.app.private_car_for_public_list')
            //         || $state.includes('site.app.private_car_for_public_detail')
            //         || $state.includes('site.app.approval_form_list')
            //         || $state.includes('site.app.approval_start')
            //         || $state.includes('site.app.approval_flow_list')
            //         || $state.includes('site.app.approval_flow_create')
            //         || $state.includes('site.app.approval_flow_edit')
            //         || $state.includes('site.app.private_car_for_public_detail')
            //         || $state.includes('site.app.settings.custom_value_setting')
            //         || $state.includes('site.app.setting_finance_role_list')
            //         || $state.includes('site.app.setting_finance_role_detail')
            //         || $state.includes('site.app.finance_role_user_edit');
            // };
            //
            // $scope.isReceiptedInvoiceActive = function () {
            //     return $state.includes('site.app.company_receipted_invoice_list')
            //         || $state.includes('site.app.company_receipted_invoice_create')
            //         || $state.includes('site.app.company_receipted_invoice_detail');
            // };
            // $scope.isFinanceManagementActive = function () {
            //     return $state.includes('site.app.fm_dashboard')
            //         || $state.includes('site.app.expense_report_payment')
            //         || $state.includes('site.app.expense_report_audit')
            //         || $state.includes('site.app.expense_report_detail_audit')
            //         || $state.includes('site.app.expense_report_detail_payment')
            //         || $state.includes('site.app.payment_batch_list')
            //         || $state.includes('site.app.expense_report_qrcode')
            //         || $state.includes('site.app.loan_management_container')
            //         || $state.includes('site.app.finance_loan_list')
            //         || $state.includes('site.app.finance_overall_list')
            //         || $state.includes('site.app.finance_overall_sub_list')
            //         || $state.includes('site.app.custom_application_finance')
            //         || $state.includes('site.app.writeoff_history_finance')
            //         || $state.includes('site.app.refund_transfer_finance')
            //         || $state.includes('site.app.refund_transfer_detail')
            //         || $state.includes('site.app.expense_report_detail_view')
            //         || $state.includes('site.app.refund_transfer_withdraw')
            //         || $state.includes('site.app.finance_repayment_list')
            //         || $state.includes('site.app.company_receipted_invoice_list')
            //         || $state.includes('site.app.company_receipted_invoice_detail')
            //         || $state.includes('site.app.company_receipted_invoice_create')
            //         || $state.includes('site.app.finance_payment_batch')
            //         || $state.includes('site.app.finance_repayment_list')
            //         || $state.includes('site.app.financial_approval_expense_audit')
            //         || $state.includes('site.app.financial_approval_expense_payment')
            //         || $state.includes('site.app.company_receipted_invoice_platform')
            //         || $state.includes('site.app.jingdong_receipted_invoice_list')
            //         || $state.includes('site.app.jingdong_receipted_invoice_create')
            //         || $state.includes('site.app.jingdong_receipted_invoice_waitApproval')
            //         || $state.includes('site.app.jingdong_receipted_invoice_approvalReject')
            //         || $state.includes('site.app.jingdong_receipted_invoice_waitApprovalSuccess')
            //         || $state.includes('site.app.jingdong_receipted_invoice_someApprovalSuccess')
            //         || $state.includes('site.app.jingdong_receipted_invoice_allApprovalSuccess')
            //         || $state.includes('site.app.jingdong_application_detail')
				// 	|| $state.includes('site.app.financial_approval_expense_payment')
            //         || $state.includes('site.app.financial_global_view');
            // };
            //
            // $scope.isApplicationApplyActive = function () {
            //     return $state.includes('site.app.application_list')
            //         || $state.includes('site.app.invoice_apply_create')
            //         || $state.includes('site.app.invoice_apply_edit')
            //         || $state.includes('site.app.invoice_apply_detail')
            //         || $state.includes('site.app.invoice_apply_wait_approval')
            //         || $state.includes('site.app.travel_create')
            //         || $state.includes('site.app.travel_edit')
            //         || $state.includes('site.app.travel_approving')
            //         || $state.includes('site.app.travel_approved')
            //         || $state.includes('site.app.custom_application_create')
            //         || $state.includes('site.app.custom_application_approving')
            //         || $state.includes('site.app.custom_application_approved')
            //         || $state.includes('site.app.custom_application_finance')
            //         || $state.includes('site.app.custom_application_audit')
            //         || $state.includes('site.app.custom_application_payment')
            //         || $state.includes('site.app.custom_application_detail')
            //         || $state.includes('site.app.writeoff_history')
            //
            //         ;
            // };
            //
            // $scope.isApprovalActive = function () {
            //     return $state.includes('site.app.expense_report_approval')
            //         || $state.includes('site.app.custom_application_approver')  // 申请单审批
            //         || $state.includes('site.app.expense_report_detail_approve')
            //         || $state.includes('site.app.application_report_approval')
            //         || $state.includes('site.app.invoice_apply_approval')
            //         || $state.includes('site.app.travel_approver');
            // };
            //
            // $scope.isBookerActive = function () {
            //     return $state.includes('site.app.booker_list')
            //          || $state.includes('site.app.booker_detail');
            // };
            //
            // $scope.isReportActive = function () {
            //     return $state.includes('site.app.report_expense_report')
            //         || $state.includes('site.app.report_air_fly_expense')
            //         || $state.includes('site.app.report_invoice');
            // };
            //
            // $scope.isReportSettingActive = function () {
            //     return $state.includes('site.app.report_setting_list')
            //         || $state.includes('site.app.report_setting_create')
            //         || $state.includes('site.app.report_setting_detail');
            // };

            (function () {
                // $scope.reportList = [];
                // $scope.view.settings = $scope.isSettingsActive();
                // $scope.view.expenseReport = $scope.isExpenseReportActive();
                // $scope.view.userManagement = $state.includes('site.app.userManagement');
                // $scope.view.finance = $scope.isFinanceManagementActive();
                // $scope.view.data = $state.includes('site.app.payment_batch_list');
                // $scope.view.receiptedInvoice = $scope.isReceiptedInvoiceActive();
                // $scope.view.approval = $scope.isApprovalActive();
                // $scope.view.application = $scope.isApplicationApplyActive();
                // $scope.view.booker = $scope.isBookerActive();
                // $scope.view.report = $scope.isReportActive();
                // $scope.view.reportSetting = $scope.isReportSettingActive();
            })();
        }]);
