import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { action, token, repo, path, branch = 'main' } = await req.json();
    const headers = {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'DesignSystemVisualizer'
    };

    if (action === 'list_repos') {
      const res = await fetch('https://api.github.com/user/repos?per_page=100&sort=updated', { headers });
      const data = await res.json();
      if (!res.ok) return Response.json({ error: data.message }, { status: res.status });
      return Response.json({ repos: data.map(r => ({ name: r.full_name, default_branch: r.default_branch, description: r.description })) });
    }

    if (action === 'get_tree') {
      const treeRes = await fetch(`https://api.github.com/repos/${repo}/git/trees/${branch}?recursive=1`, { headers });
      const tree = await treeRes.json();
      if (!treeRes.ok) return Response.json({ error: tree.message }, { status: treeRes.status });
      return Response.json({ tree: tree.tree });
    }

    if (action === 'get_file') {
      const fileRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`, { headers });
      const file = await fileRes.json();
      if (!fileRes.ok) return Response.json({ error: file.message }, { status: fileRes.status });
      const content = atob(file.content.replace(/\n/g, ''));
      return Response.json({ content });
    }

    return Response.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});