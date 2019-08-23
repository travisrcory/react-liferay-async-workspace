<%@ include file="/init.jsp" %>

<div id="<portlet:namespace />container"></div>

<aui:script require="my-async-mvc-portlet-test@1.0.0 as component">
	component.default("<portlet:namespace />container");
</aui:script>