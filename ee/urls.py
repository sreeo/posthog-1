from typing import Any, List

from django.urls.conf import path
from rest_framework_extensions.routers import NestedRegistryItem

from ee.api import integration
from posthog.api.routing import DefaultRouterPlusPlus

from .api import (
    authentication,
    billing,
    dashboard_collaborator,
    debug_ch_queries,
    explicit_team_member,
    hooks,
    license,
    sentry_stats,
    subscription,
)


def extend_api_router(
    root_router: DefaultRouterPlusPlus,
    *,
    projects_router: NestedRegistryItem,
    project_dashboards_router: NestedRegistryItem,
) -> None:
    root_router.register(r"billing-v2", billing.BillingViewset, "billing")
    root_router.register(r"license", license.LicenseViewSet)
    root_router.register(r"debug_ch_queries", debug_ch_queries.DebugCHQueries, "debug_ch_queries")
    root_router.register(r"integrations", integration.PublicIntegrationViewSet)

    projects_router.register(r"hooks", hooks.HookViewSet, "project_hooks", ["team_id"])
    projects_router.register(
        r"explicit_members", explicit_team_member.ExplicitTeamMemberViewSet, "project_explicit_members", ["team_id"]
    )
    project_dashboards_router.register(
        r"collaborators",
        dashboard_collaborator.DashboardCollaboratorViewSet,
        "project_dashboard_collaborators",
        ["team_id", "dashboard_id"],
    )

    projects_router.register(r"subscriptions", subscription.SubscriptionViewSet, "subscriptions", ["team_id"])


urlpatterns: List[Any] = [
    path("api/saml/metadata/", authentication.saml_metadata_view),
    path("api/sentry_errors/", sentry_stats.sentry_stats),
]
